//#region Import
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import type { FiltersFieldMappingType, DataGridKey } from "@/core/slices/data-grid-slice/types"
import { getContactFilterAndContactSearchFilter, getContactAdvancedFilter } from "@/features/people/contacts/utils"
import { useSubmitExportsFileMutation } from "@/features/people/exports/api"
import exportFields from "@/features/people/exports/constants/export-fields"
import exportSchema, { type ExportSchemaType } from "@/features/people/exports/schemas/export-schema"
import type { SubmitExportsFileBody } from "@/features/people/exports/types"
import { getDefaultExportsFileName } from "@/features/people/exports/utils"
import { twMerge, useForm, Button, Checkbox, Footer, Form, Input } from "@/ui"
import { cleanObject } from "@/utils"
//#endregion

export type ExportsType = Extract<DataGridKey, "contacts" | "contacts-in-group" | "segments">

const companyName = import.meta.env.VITE_APP_PREFIX

export interface ExportFieldsDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void

	/**
	 * Type of entries to be exported. This prop is mainly used to identify whether we're exporting contacts or segments
	 */
	exportsType: ExportsType
}

const ExportFieldsDialogContent = ({ exportsType, onClose }: ExportFieldsDialogContentProps) => {
	const { t } = useTranslation("exports")

	const dispatch = useDispatch()

	const { selection, filters, searchTerm } = useSelector(({ dataGrid }) => dataGrid[exportsType as ExportsType])

	const defaultFileName = getDefaultExportsFileName(companyName, exportsType === "segments" ? "segments" : "contacts")

	const form = useForm<ExportSchemaType>({
		resolver: zodResolver(exportSchema),
		defaultValues: {
			fileName: defaultFileName,
			exportedFields: [],
		},
		mode: "onSubmit",
	})

	const [submitExport, { isLoading }] = useSubmitExportsFileMutation()

	const selectedFields = form.watch("exportedFields")
	const allFields = useMemo(() => exportFields?.map(({ value }) => value), [])
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

	const onSubmit = async ({ fileName, exportedFields }: ExportSchemaType) => {
		let body: SubmitExportsFileBody = {
			fileName,
			contactsIds: !!selection && selection !== "ALL" ? selection : undefined,
			exportedFields,
		}

		if (exportsType === "contacts") {
			// Statically inferring type of Filters to Its Origin -- Contacts Filters used only in Contacts Table, In order to find advancedFilters without TS erros
			const contactAdvancedFilter = getContactAdvancedFilter(
				(filters as FiltersFieldMappingType["contacts"])?.advancedFilters
			)

			body = { ...body, ...contactAdvancedFilter }
		}

		if (exportsType !== "segments") {
			const contactFilterAndContactSearchFilter = getContactFilterAndContactSearchFilter(filters, searchTerm)

			body = { ...body, ...contactFilterAndContactSearchFilter }
		}

		// Cleaning Body from all undefined values, empty objects, and nested objects with undefined values
		const cleanBody = cleanObject(body)

		await submitExport(cleanBody)
			.unwrap()
			.then(() => {
				// Clearing Selection list if contacts were selected using their Ids
				if (cleanBody?.contactsIds) dispatch(clearSelection(exportsType as DataGridKey))

				toast.success(({ id }) => <SuccessToast id={id} />)
				form.reset()
				onClose()
			})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 overflow-hidden p-2'>
				<Form.Field
					control={form.control}
					name='fileName'
					render={({ field }) => (
						<Form.Item>
							<Form.Label>{t("dialogs.exportFields.fields.fileName.label")}</Form.Label>
							<Form.Control>
								<Input placeholder={t("dialogs.exportFields.fields.fileName.placeholder")} {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={form.control}
					name='exportedFields'
					render={() => (
						<Form.Item className='flex flex-col overflow-hidden'>
							<div className='mb-2 flex w-full items-end justify-between'>
								<Form.Label className='pb-0'>{t("dialogs.exportFields.fields.selectExportFields.label")}</Form.Label>
								<Button type='button' variant='text' size='sm' className='-mb-1 h-max p-0 pe-2' onClick={onSelectAll}>
									{isAllSelected
										? t("dialogs.exportFields.buttons.clearAll")
										: t("dialogs.exportFields.buttons.selectAll")}
								</Button>
							</div>

							<div className='space-y-3 overflow-y-auto rounded-xl bg-[#f7f7f7] p-4'>
								{exportFields.map(({ value, label }, idx) => (
									<Form.Field
										key={`${value}-${idx}`}
										control={form.control}
										name='exportedFields'
										render={({ field }) => (
											<Form.Item key={`${value}-${idx}`} className='flex flex-row items-center space-x-3 space-y-0'>
												<Form.Control>
													<Checkbox
														checked={field.value?.includes(value)}
														onCheckedChange={(checked) =>
															checked
																? field.onChange([...field.value, value])
																: field.onChange(field.value?.filter((i) => i !== value))
														}
													/>
												</Form.Control>
												<Form.Label
													className={twMerge(
														"cursor-pointer pb-0 transition-basic hover:text-primary-900",
														field.value?.includes(value) && "text-primary-900"
													)}>
													{t(label)}
												</Form.Label>
											</Form.Item>
										)}
									/>
								))}
							</div>

							<Form.Message />
						</Form.Item>
					)}
				/>

				<Footer>
					<Button type='submit' className='px-10' loading={isLoading}>
						{t("dialogs.exportFields.buttons.submit")}
					</Button>
				</Footer>
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
			<Link className='text-sm text-primary-700 underline' to={appPaths.EXPORTS} onClick={() => toast.dismiss(id)}>
				{t("success_2")}
			</Link>
		</div>
	)
}
