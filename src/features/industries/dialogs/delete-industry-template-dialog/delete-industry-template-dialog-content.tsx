//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

import { useDataGridContext } from "@/core/components/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import { useDeleteIndustryTemplatesMutation } from "@/features/industries/api"
import type { DeleteIndustryTemplatesBody } from "@/features/industries/types"
import { Button, Footer, Input, Label } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
//#endregion

export interface DeleteIndustryTemplateDialogContentProps {
	/**
	 * list of Industry template Ids to be deleted
	 */
	ids: string[]

	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const DeleteIndustryTemplateDialogContent = ({ ids = [], closeDialog }: DeleteIndustryTemplateDialogContentProps) => {
	const { industryId } = useParams()

	const dispatch = useDispatch()

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDeleteIndustryTemplates, { isLoading }] = useDeleteIndustryTemplatesMutation()
	const [promptInputValue, setPromptInputValue] = useState<string>()
	const { filters, searchTerm, selection } = useSelector(({ dataGrid }) => dataGrid["sms-industry-templates"])

	const { count } = useDataGridContext()

	const templatesToBeDeletedCount = selection === "ALL" ? count : ids.length
	const deleteButtonDisabled = templatesToBeDeletedCount > 1 && promptInputValue !== `${templatesToBeDeletedCount}`

	const onSubmit = async () => {
		if (!templatesToBeDeletedCount) return

		const body: DeleteIndustryTemplatesBody = {
			industryId: industryId!,
			prebuiltTemplatesIds: ids,
			prebuiltTemplateFilter: !ids?.length ? filters : undefined,
			prebuiltTemplateSearchFilter: !ids?.length
				? { name: searchTerm, any: Boolean(searchTerm?.length) || undefined }
				: undefined,
		}

		await triggerDeleteIndustryTemplates(body).unwrap()

		toast.success("Template deleted successfully.")
		dispatch(clearSelection("sms-industry-templates"))

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex flex-col gap-6 p-2'>
			{templatesToBeDeletedCount > 1 ? (
				<>
					<p className='w-full overflow-x-auto text-base'>
						Are you sure you want to delete <strong>({templatesToBeDeletedCount}) selected</strong> templates? Deleting
						templates is permanent and cannot be undone.
					</p>

					<div>
						<Label>Type {`"${templatesToBeDeletedCount}"`} to confirm</Label>
						<Input
							size='lg'
							placeholder='Enter number'
							value={promptInputValue}
							onChange={(e) => setPromptInputValue(e.target.value)}
						/>
					</div>
				</>
			) : (
				<p className='w-full overflow-x-auto text-base'>Are you sure you want to delete this template?</p>
			)}

			<Footer>
				<Button type='submit' disabled={deleteButtonDisabled} className='px-10' onClick={onSubmit} loading={isLoading}>
					Delete
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteIndustryTemplateDialogContent
