//#region Import
import type { DeleteIndustryTemplatesBody } from "@/features/industries/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { useDeleteIndustryTemplatesMutation } from "@/features/industries/api"
import { Button, Input, Label } from "@/ui"
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

	const [promptInputValue, setPromptInputValue] = useState<string>("")

	const { filters, searchTerm, selection } = useSelector(({ dataView }) => dataView["sms-industry-templates"])

	const { count } = useDataViewContext()

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
		<div className='flex flex-1 flex-col justify-between gap-6 p-2'>
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

			<Button
				className='ms-auto w-full px-10 sm:w-max'
				disabled={deleteButtonDisabled}
				loading={isLoading}
				onClick={onSubmit}
				type='submit'>
				Delete
			</Button>
		</div>
	)
}

export default DeleteIndustryTemplateDialogContent
