//#region Import
import type { DataViewFilterType, DataViewKey } from "@/core/components/data-view/types"
import type { SubmitExportsFileBody } from "@/features/people/exports/types"

import { clearSelection } from "@/core/components/data-view/data-view-slice"
import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { getContactAdvancedFilter, getContactFilter, getContactSearchFilter } from "@/features/people/contacts/utils"
import { useSubmitExportsFileMutation } from "@/features/people/exports/api"
import exportsFieldsOptions from "@/features/people/exports/constants/exports-fields-options"
import exportSchema, { type ExportSchemaType } from "@/features/people/exports/schemas/export-schema"
import { Button, Checkbox, Form, Input, Label, useForm } from "@/ui"
import { cleanObject, generateFileName, omit } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
//#endregion

export type ExportsType = Extract<DataViewKey, "contacts-in-group" | "contacts" | "segments">

const companyName = import.meta.env.VITE_APP_PREFIX

export interface ExportFieldsDialogContentProps {
	/**
	 * Type of entries to be exported. This prop is mainly used to identify whether we're exporting contacts or segments
	 */
	exportsType: ExportsType

	/**
	 * Callback function used to close the dialog
	 */
	onDialogClose: () => void

	/**
	 * Only Passed if component is used for exporting segments
	 */
	segmentId?: string
}

const ExportFieldsDialogContent = ({ exportsType, onDialogClose, segmentId }: ExportFieldsDialogContentProps) => {
	const { t } = useTranslation("exports")

	const dispatch = useDispatch()

	const { filters, searchTerm, selection } = useSelector(({ dataView }) => dataView[exportsType as ExportsType])

	const defaultFileName = generateFileName(companyName, exportsType === "segments" ? "segments" : "contacts")

	const form = useForm<ExportSchemaType>({
		defaultValues: {
			exportedFields: [],
			fileName: defaultFileName,
		},
		mode: "onSubmit",
		resolver: zodResolver(exportSchema),
	})

	const [submitExport, { isLoading }] = useSubmitExportsFileMutation()

	const selectedFields = form.watch("exportedFields")

	const allFields = useMemo(() => exportsFieldsOptions?.map(({ value }) => value), [])

	const isAllSelected = useMemo(
		() => !!selectedFields?.length && selectedFields?.length === allFields?.length,
		[selectedFields, allFields]
	)

	const onSelectAll = () => {
		// Clearing any error on `Select Field` if it exists
		form.clearErrors("exportedFields")

		if (isAllSelected) return form.setValue("exportedFields", [])

		// using Set to prevent having same entries
		const allSelection = new Set([...selectedFields, ...allFields])

		return form.setValue("exportedFields", [...allSelection])
	}

	const onSubmit = async ({ exportedFields, fileName }: ExportSchemaType) => {
		let body: SubmitExportsFileBody = {
			contactsIds: !!selection && selection !== "ALL" ? selection : undefined,
			exportedFields,
			fileName,
		}

		// Calling From Contacts-View
		if (exportsType === "contacts") {
			// Statically inferring type of Filters to Its Origin -- Contacts Filters used only in Contacts Table, In order to find advancedFilters without TS erros
			const contactAdvancedFilter = getContactAdvancedFilter(
				(filters as DataViewFilterType["contacts"])?.advancedFilters
			)

			body = { ...body, contactAdvancedFilter }
		}

		// Calling From Contacts-View OR Contacts in Group View
		if (exportsType !== "segments") {
			body = {
				...body,
				contactFilter: getContactFilter(omit(filters as DataViewFilterType["contacts"], "advancedFilters")),
				contactSearchFilter: getContactSearchFilter(searchTerm),
			}
		}

		if (exportsType === "segments") {
			body = {
				...body,
				contactAdvancedFilter: { segmentId },
			}
		}

		// Cleaning Body from all undefined/empty/nullish objects/nested objects
		const cleanBody = cleanObject(body)

		await submitExport(cleanBody).unwrap()

		// Clearing Selection list if contacts were selected using their Ids
		if (cleanBody?.contactsIds) dispatch(clearSelection(exportsType as DataViewKey))

		toast.success(({ id }) => <SuccessToast id={id} />)

		form.reset()
		onDialogClose()
	}

	return (
		<Form {...form}>
			<form
				className='flex h-full flex-col justify-between gap-6 overflow-hidden p-2'
				onSubmit={form.handleSubmit(onSubmit)}>
				<Form.Field
					control={form.control}
					name='fileName'
					render={({ field }) => (
						<Form.Item label={t("dialogs.exportFields.fields.fileName.label")}>
							<Input placeholder={t("dialogs.exportFields.fields.fileName.placeholder")} {...field} />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={form.control}
					name='exportedFields'
					render={() => (
						<Form.Item className='flex flex-col overflow-hidden'>
							<>
								<div className='mb-2 flex w-full items-end justify-between'>
									<Label className='pb-0'>{t("dialogs.exportFields.fields.selectExportFields.label")}</Label>
									<Button className='-mb-1 h-max p-0 pe-2' onClick={onSelectAll} size='sm' type='button' variant='text'>
										{isAllSelected
											? t("dialogs.exportFields.buttons.clearAll")
											: t("dialogs.exportFields.buttons.selectAll")}
									</Button>
								</div>

								<div className='space-y-3 overflow-y-auto rounded-xl bg-[#f7f7f7] p-4'>
									{exportsFieldsOptions.map(({ label, value }, idx) => (
										<Form.Field
											control={form.control}
											key={`${value}-${idx}`}
											name='exportedFields'
											render={({ field }) => (
												<Form.Item
													className='flex-row-reverse items-center justify-end gap-2 space-x-2 [&_button]:!mx-0 [&_label]:cursor-pointer [&_label]:pb-0 [&_label]:transition-basic [&_label]:hover:text-primary-900'
													hideError
													key={`${value}-${idx}`}
													label={t(label)}>
													<Checkbox
														checked={field.value?.includes(value)}
														onCheckedChange={(checked) =>
															checked
																? field.onChange([...field.value, value])
																: field.onChange(field.value?.filter((i) => i !== value))
														}
													/>
												</Form.Item>
											)}
										/>
									))}
								</div>
							</>
						</Form.Item>
					)}
				/>

				<Button className='ms-auto w-full px-10 sm:w-max' loading={isLoading} type='submit'>
					{t("dialogs.exportFields.buttons.submit")}
				</Button>
			</form>
		</Form>
	)
}

export default ExportFieldsDialogContent

const SuccessToast = ({ id }: { id: string }) => {
	const { t } = useTranslation("exports", { keyPrefix: "dialogs.exportFields.message" })

	return (
		<div>
			<span className='me-1.5 text-sm font-medium'>{t("success_1")}</span>
			<Link className='text-sm text-primary-700 underline' onClick={() => toast.dismiss(id)} to={appPaths.EXPORTS}>
				{t("success_2")}
			</Link>
		</div>
	)
}
