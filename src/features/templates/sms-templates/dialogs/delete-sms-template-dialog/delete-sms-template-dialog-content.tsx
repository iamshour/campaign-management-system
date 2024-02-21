//#region Import
import { useState } from "react"
import toast from "react-hot-toast"

import { useDataGridContext } from "@/core/components/data-grid"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { clearSelection } from "@/core/slices/data-grid-slice/data-grid-slice"
import { useDeleteSmsTemplatesMutation } from "@/features/templates/sms-templates/api"
import { DeleteSmsTemplatesBody } from "@/features/templates/sms-templates/types"
import { Button, Footer, Input, Label } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
//#endregion

export interface DeleteSmsTemplateDialogContentProps {
	/**
	 * list of sms template Ids to be deleted
	 */
	ids: string[]

	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const DeleteSmsTemplateDialogContent = ({ ids = [], closeDialog }: DeleteSmsTemplateDialogContentProps) => {
	const dispatch = useDispatch()

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDeleteSmsTemplates, { isLoading }] = useDeleteSmsTemplatesMutation()
	const [promptInputValue, setPromptInputValue] = useState<string>()

	const { count } = useDataGridContext()

	const { filters, searchTerm } = useSelector(({ dataGrid }) => dataGrid["sms-templates"])

	const templatesToBeDeletedCount = ids.length || count
	const deleteButtonDisabled = ids.length > 1 && promptInputValue !== `${templatesToBeDeletedCount}`

	const onSubmit = async () => {
		if (!templatesToBeDeletedCount) return

		const body: DeleteSmsTemplatesBody = {
			templatesIds: ids,
			templateFilter: filters,
			templateSearchFilter: { name: searchTerm, any: searchTerm?.length ? true : undefined },
		}

		await triggerDeleteSmsTemplates(body).unwrap()

		toast.success("Template deleted successfully.")
		dispatch(clearSelection("sms-templates"))

		closeDialog()
		if (closeDropdown) closeDropdown()
	}

	return (
		<div className='flex flex-col gap-6 p-2'>
			{templatesToBeDeletedCount > 1 ? (
				<>
					<p className='w-full overflow-x-auto text-base'>
						Are you sure you want to delete <strong>({templatesToBeDeletedCount}) selected</strong> templates?
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

export default DeleteSmsTemplateDialogContent
