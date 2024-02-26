//#region Import
import type { DeleteIndustryTemplatesBody } from "@/features/industries/types"

import { useDataGridContext } from "@/core/components/data-grid/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import { useDeleteIndustryTemplatesMutation } from "@/features/industries/api"
import { Button, Footer, Input, Label } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
//#endregion

export interface DeleteIndustryTemplateDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * list of Industry template Ids to be deleted
	 */
	ids: string[]
}

const DeleteIndustryTemplateDialogContent = ({ closeDialog, ids = [] }: DeleteIndustryTemplateDialogContentProps) => {
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
		if (!templatesToBeDeletedCount || !industryId) return

		const body: DeleteIndustryTemplatesBody = {
			industryId,
			prebuiltTemplateFilter: !ids?.length ? filters : undefined,
			prebuiltTemplateSearchFilter: !ids?.length
				? { any: Boolean(searchTerm?.length) || undefined, name: searchTerm }
				: undefined,
			prebuiltTemplatesIds: ids,
		}

		await triggerDeleteIndustryTemplates(body).unwrap()

		toast.success("Template deleted successfully.")
		dispatch(clearSelection("sms-industry-templates"))

		closeDialog()

		if (closeDropdown !== undefined) closeDropdown()
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
							onChange={(e) => setPromptInputValue(e.target.value)}
							placeholder='Enter number'
							size='lg'
							value={promptInputValue}
						/>
					</div>
				</>
			) : (
				<p className='w-full overflow-x-auto text-base'>Are you sure you want to delete this template?</p>
			)}

			<Footer>
				<Button className='px-10' disabled={deleteButtonDisabled} loading={isLoading} onClick={onSubmit} type='submit'>
					Delete
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteIndustryTemplateDialogContent
