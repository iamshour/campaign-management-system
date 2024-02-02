//#region Import
import { Button, BackButton, Footer } from "@/ui"
import { getListOfKey, useStep } from "@/utils"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import {
	useImportFileMappingMutation,
	useSubmitImportContactsMutation,
	useUploadContactsContentDataMutation,
} from "@/features/people/contacts/api"
import type { ContactScreamSnakeCaseKey, ImportFileMappingArgs } from "@/features/people/contacts/types"

import type { ImportContactsDialogContextProps, ImportContactsDialogContextValueType, ImportsDataType } from "./types"

import MdiInformationSlabCircle from "~icons/mdi/information-slab-circle"
//#endregion

const initialImportsData: ImportsDataType = {
	importType: "file",
	fileHasHeader: false,
	tags: [],
	groups: [],
	previewRows: [],
}

const ImportContactsDialogContextProvider = createContext<ImportContactsDialogContextValueType>(
	{} as ImportContactsDialogContextValueType
)

const ImportContactsDialogContext = ({ children, onClose }: ImportContactsDialogContextProps) => {
	const { t } = useTranslation("contacts")
	const [currentStep, { goToNextStep, goToPrevStep, canGoToNextStep, canGoToPrevStep }] = useStep(3)

	// Used for data used throughout Dialog Usage
	const [data, setData] = useState<Omit<ImportsDataType, "loading">>(initialImportsData)
	const { importType, file, pastedContent, fileName, fileHasHeader, columnNameToIndexMapping, tags, groups } = data

	/**
	 * Callback function used to clear Dialog Data
	 */
	const resetData = useCallback(() => setData(initialImportsData), [])

	/**
	 * Callback function used to update Dialog Data
	 * @param newData Could be an object containing partial part of the data, or a callback function
	 *                to be used to update the data, which holds previous data as a param
	 */
	const updateData = useCallback((newData: Partial<ImportsDataType> | React.SetStateAction<ImportsDataType>): void => {
		if (newData instanceof Function) return setData(newData)
		return setData((prev) => ({ ...prev, ...newData }))
	}, [])

	/**
	 * Boolean used to check if submitted data is valid at each step of the dialog.
	 * A falsy return would prevent user from proceeding to next step
	 */
	const isDataValid = useMemo<boolean>(() => {
		// Checking First step: Importing File/Pasted content
		if (currentStep === 1)
			return (importType === "file" && !!file) || (importType === "copyPaste" && !!pastedContent?.length)

		if (currentStep === 2 || currentStep === 3) {
			const doesPhoneOrEmailExists =
				!!columnNameToIndexMapping &&
				Object.keys(columnNameToIndexMapping)?.some((key) =>
					(["PHONE_NUMBER", "EMAIL"] as ContactScreamSnakeCaseKey[])?.includes(key as ContactScreamSnakeCaseKey)
				)
			const areGroupsSizeValid = !!groups && groups?.length <= 10
			const areTagsSizeValid = !!tags && tags?.length <= 10

			return (
				!!doesPhoneOrEmailExists &&
				!!fileName?.length &&
				fileHasHeader !== undefined &&
				!!areGroupsSizeValid &&
				!!areTagsSizeValid
			)
		}

		return false
	}, [importType, currentStep, file, pastedContent, fileName, fileHasHeader, columnNameToIndexMapping, tags, groups])

	const [triggerUploadContactsContentData, { isLoading: uploadFileLoading }] = useUploadContactsContentDataMutation()
	const [triggerImportFileMapping, { isLoading: importMappingLoading }] = useImportFileMappingMutation()
	const [triggerSubmitImportContacts, { isLoading: submitImportContactsLoading }] = useSubmitImportContactsMutation()

	/**
	 * Submitting First Action (Uploading file or Uploading Pasted content). A succesfull response
	 * would move user to next step: Headers Mapping Step
	 */
	const onFileUploadSubmit = async () => {
		if (!isDataValid || !importType) return

		const formData = new FormData()

		if (importType === "file") {
			formData.append("contactsFile", file as Blob)
		} else {
			if (!pastedContent) return

			const blob = new Blob([pastedContent], { type: "text/plain" })
			formData.append("contactsFile", blob)
		}

		const jsonBlob = new Blob([JSON.stringify({ maxPreviewColumns: 10, maxPreviewRows: 7 })], {
			type: "application/json",
		})
		formData.append("uploadAndPreviewContactsFileRequest", jsonBlob)

		await triggerUploadContactsContentData(formData)
			.unwrap()
			.then(({ fileName, previewRows }) => {
				updateData({ fileName, previewRows })
				goToNextStep()
			})
	}

	/**
	 * Function used to get Mapping content (`columnNameToIndexMapping`), as well as other selected data by the user
	 * such as `groups`, `tags`, `fileHasHeader` bool, and assigning these data with the right `fileName` passed from
	 * previous step. This function is used in Second and Third step of the Dialog Submission
	 *
	 * @returns
	 */
	const getMappingBody = (): ImportFileMappingArgs | undefined => {
		if (!fileName || fileHasHeader == undefined || !columnNameToIndexMapping) {
			toast.error("dialogs.importContacts.message.invalidData")
			return
		}

		return {
			fileName,
			fileHasHeader,
			columnNameToIndexMapping,
			groups: getListOfKey(groups, "value"),
			tags,
		}
	}

	/**
	 * Submitting Second Action (Headers Mapping), which will send data from Mapping step to be validated
	 */
	const onHeadersMappingSubmit = async () => {
		const body = getMappingBody()

		if (!body) return

		await triggerImportFileMapping(body)
			.unwrap()
			.then((validationResponse) => {
				updateData({ validationResponse })
				goToNextStep()
			})
	}

	/**
	 * Submitting Last action in Import Contacts Dialog Form, handled at the last step (Review)
	 * A success response will close the dialog, and adds the succefull imported contacts to the contacts entries
	 */
	const ontReviewSubmit = async () => {
		const body = getMappingBody()

		if (!body) return

		await triggerSubmitImportContacts(body)
			.unwrap()
			.then(() => {
				toast.success(t("dialogs.importContacts.message.reviewSuccess"))
				onClose()
			})
	}

	/**
	 * Main Function used on the Submit/Next to assign each step with the correct callback function
	 */
	const onNextStep = () => {
		if (!isDataValid) return toast.error("Invalid Data")

		if (currentStep === 1) onFileUploadSubmit()
		if (currentStep === 2) onHeadersMappingSubmit()
		if (currentStep === 3 && !canGoToNextStep) ontReviewSubmit()
	}

	/**
	 * Loading Boolean used to show Loader for the Next/Submit button
	 */
	const loading = uploadFileLoading || importMappingLoading || submitImportContactsLoading

	return (
		<ImportContactsDialogContextProvider.Provider
			value={{ currentStep, resetData, data, updateData, uploadFileLoading }}>
			{canGoToPrevStep && <BackButton className='absolute start-1.5 top-1.5 ' onClick={goToPrevStep} />}

			<div className='flex h-full flex-col gap-6 overflow-hidden p-2'>
				<div className='flex flex-1 flex-col overflow-hidden rounded-lg bg-slate-100 p-4'>
					<header className='mb-4 flex gap-4'>
						<MdiInformationSlabCircle className='shrink-0 text-xl text-primary-600' />
						<div>
							<h2 className='mb-0.5 font-bold'>
								{t(`dialogs.importContacts.${localizedFieldnameMap[currentStep]}.title`)}
							</h2>
							<p className='block text-sm text-[#545454]'>
								{t(`dialogs.importContacts.${localizedFieldnameMap[currentStep]}.description`)}
							</p>
						</div>
					</header>
					{children}
				</div>

				<Footer>
					<Button variant='outline' onClick={onClose}>
						{t("ui:buttons.cancel")}
					</Button>
					<Button loading={loading} onClick={onNextStep} disabled={!isDataValid}>
						{t(`dialogs.importContacts.${localizedFieldnameMap[currentStep]}.buttons.submit`)}
					</Button>
				</Footer>
			</div>
		</ImportContactsDialogContextProvider.Provider>
	)
}

export default ImportContactsDialogContext

// eslint-disable-next-line
export const useImportContactsDialogContext = (): ImportContactsDialogContextValueType =>
	useContext(ImportContactsDialogContextProvider)

/**
 * Map used to get field name in localization JSON file based on current step (current view of Dialog)
 */
const localizedFieldnameMap: Record<number, string> = {
	1: "fileSelection",
	2: "fieldsMapping",
	3: "fileReview",
}
