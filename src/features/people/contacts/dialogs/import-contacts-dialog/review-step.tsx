//#region Import
import type { ContactScreamSnakeCaseKey } from "@/features/people/contacts/types"

import { useGetInvalidContactsFileMutation } from "@/features/people/contacts/api"
import { type IconType, isoCountryOptions } from "@/ui"
import { getListOfKey } from "@/utils"
import MaterialSymbolsFitbitCheckSmall from "~icons/material-symbols/fitbit-check-small"
import PhDatabaseBold from "~icons/ph/database-bold"
import PhWarningCircle from "~icons/ph/warning-circle"
import { lazy } from "react"
import toast from "react-hot-toast"
import { Trans, useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import { useImportContactsDialogContext } from "./import-contacts-dialog-context"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const ReviewStep = () => {
	const {
		data: { groups, tags, validationResponse },
	} = useImportContactsDialogContext()

	const { t } = useTranslation("contacts")

	const [triggerGetInvalidContactsFile] = useGetInvalidContactsFileMutation()

	if (!validationResponse) return <DisplayError />

	const {
		alreadyExistMap,
		countryCountMap,
		invalidContactsExportFileName,
		invalidContactsFailedCount,
		totalFailedCount,
		totalSuccessCount,
	} = validationResponse

	const countryCountMapEntries = Object.entries(countryCountMap)

	const alreadyExistMapEntries = Object.entries(alreadyExistMap) as unknown as [ContactScreamSnakeCaseKey, string][]

	const handleDownload = async () => {
		if (!invalidContactsExportFileName) return

		await triggerGetInvalidContactsFile(invalidContactsExportFileName).unwrap()
		toast.success(t("dialogs.importContacts.message.downloadFileSuccess"))
	}

	return (
		<div className='flex h-full w-full flex-1 flex-col overflow-y-auto p-2'>
			<div className='flex w-full flex-wrap rounded-[18px] border border-[#DADADA] bg-[#EFEFEF] p-4'>
				<Card
					className='text-primary-600'
					count={totalSuccessCount + totalFailedCount}
					icon={PhDatabaseBold}
					label={t("dialogs.importContacts.fileReview.cards.allRows")}
				/>
				<Card
					className='text-[#75AF08]'
					count={totalSuccessCount}
					icon={MaterialSymbolsFitbitCheckSmall}
					label={t("dialogs.importContacts.fileReview.cards.validRows")}
				/>
				<Card
					className='text-[#EB2344]'
					count={totalFailedCount}
					icon={PhWarningCircle}
					label={t("dialogs.importContacts.fileReview.cards.notValidRows")}
				/>
			</div>

			<div className='w-full flex-1 space-y-2 p-4'>
				{(Boolean(groups?.length) || Boolean(tags?.length)) && (
					<ul className=' px-4'>
						{Boolean(groups?.length) && (
							<ListItem>
								{t("dialogs.importContacts.fileReview.validations.groups", {
									count: groups?.length,
									groups: `(${getListOfKey(groups, "label")?.join(", ")})`,
								})}
							</ListItem>
						)}
						{Boolean(tags?.length) && (
							<ListItem>
								{t("dialogs.importContacts.fileReview.validations.tags", {
									count: tags?.length,
									tags: `(${tags?.join(", ")})`,
								})}
							</ListItem>
						)}
					</ul>
				)}

				{Boolean(countryCountMapEntries?.length) && (
					<div>
						<p className='font-medium text-primary-600'>
							{t("dialogs.importContacts.fileReview.validations.countries")}
						</p>

						<ul className='px-4 py-1'>
							{countryCountMapEntries?.map(([iso, number]) => (
								<ListItem key={`${iso}-${number}`}>
									&quot;{number}&quot; {isoCountryOptions?.find(({ value }) => value === iso)?.label || "unknown"}
								</ListItem>
							))}
						</ul>
					</div>
				)}

				{Boolean(alreadyExistMapEntries?.length || invalidContactsFailedCount > 0) && (
					<div>
						<p className='-ms-4 font-medium text-[#EB2344]'>
							{t("dialogs.importContacts.fileReview.validations.otherErrors.label")}
						</p>

						<ul className='px-4 py-1'>
							{alreadyExistMapEntries?.map(([field, number]) => (
								<ListItem key={`${field}-${number}`}>
									{field === "PHONE_NUMBER"
										? t("dialogs.importContacts.fileReview.validations.otherErrors.invalidPhoneNumbers", {
												count: Number(number),
											})
										: t("dialogs.importContacts.fileReview.validations.otherErrors.invalidEmails", {
												count: Number(number),
											})}
								</ListItem>
							))}

							{invalidContactsFailedCount > 0 && (
								<ListItem>
									{t("dialogs.importContacts.fileReview.validations.otherErrors.failedInputs", {
										count: invalidContactsFailedCount,
									})}
								</ListItem>
							)}
						</ul>
					</div>
				)}

				<Trans i18nKey={"contacts:dialogs.importContacts.fileReview.validations.note"}>
					<span className='font-bold'>Note:</span>
					Any rows that contain errors will not be imported. You can
					<button
						className='m-0 mx-2 bg-transparent p-0 text-base font-medium text-primary-600 underline'
						onClick={handleDownload}>
						Export Error File
					</button>
					for further information.
				</Trans>
			</div>
		</div>
	)
}

interface CardProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "className"> {
	count: number
	icon: IconType
	label: string
}
const Card = ({ className, count, icon: Icon, label }: CardProps) => (
	<div className={twMerge("flex-1 flex-col gap-1 border-l border-l-gray-300 flex-center first:border-none", className)}>
		<Icon className='shrink-0 text-xl text-inherit' />
		<p className='text-center text-xl font-bold text-primary-600'>{count ?? 0}</p>
		<p className='text-center text-[#054060]'>{label}</p>
	</div>
)

const ListItem = ({ children }: Pick<React.LiHTMLAttributes<HTMLLIElement>, "children">) => (
	<li className='list-disc marker:text-4xl marker:text-primary-600'>
		<span className='relative -start-1.5 -top-1.5'>{children}</span>
	</li>
)

export default ReviewStep
