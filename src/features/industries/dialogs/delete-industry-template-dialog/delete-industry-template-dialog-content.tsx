//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

import { useAdvancedTableContext } from "@/core/components/advanced-table"
import useDispatch from "@/core/hooks/useDispatch"
import { clearSelection } from "@/core/slices/advanced-table-slice/advanced-table-slice"
import { useDeleteIndustryTemplatesMutation } from "@/features/industries/api"
import { Button, Footer, Input, Label } from "@/ui"
//#endregion

export interface DeleteIndustryTemplateDialogContentProps {
	/**
	 * list of Industry template Ids to be deleted
	 */
	ids: string[]

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const DeleteIndustryTemplateDialogContent = ({ ids, onClose }: DeleteIndustryTemplateDialogContentProps) => {
	/**
	 * Industry Id from the URL Params
	 */
	const { industryId } = useParams()

	const dispatch = useDispatch()

	const [triggerDeleteIndustryTemplates, { isLoading }] = useDeleteIndustryTemplatesMutation()
	const [promptInputValue, setPromptInputValue] = useState<string>()

	const { count } = useAdvancedTableContext()

	const templatesToBeDeletedCount = !ids?.length ?? count
	const deleteButtonDisabled = ids?.length > 1 && promptInputValue !== `${templatesToBeDeletedCount}`

	const onSubmit = async () => {
		if (!templatesToBeDeletedCount) return

		// TODO: handle deletion when selection="ALL", to be done based on endpoint when integrating with BE

		// NOTE: deleting endpoint is currently failing because we're using json server
		await triggerDeleteIndustryTemplates({ id: industryId || "", templatesIds: ids })
			.unwrap()
			.then(() => {
				onClose()
				toast.success("Template deleted successfully.")
				dispatch(clearSelection("sms-templates"))
			})
	}

	return (
		<div className='flex flex-col gap-6 p-2'>
			{ids?.length > 1 ? (
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
