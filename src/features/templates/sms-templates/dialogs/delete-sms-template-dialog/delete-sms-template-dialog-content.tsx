//#region Import
import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { clearSelection } from "@/core/components/data-view/data-view-slice"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import getSearchFilter from "@/core/utils/get-search-filter"
import { useDeleteSmsTemplatesMutation } from "@/features/templates/sms-templates/api"
import { DeleteSmsTemplatesBody } from "@/features/templates/sms-templates/types"
import { Button, Input, Label } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useState } from "react"
import toast from "react-hot-toast"
//#endregion

export interface DeleteSmsTemplateDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * list of sms template Ids to be deleted
	 */
	ids: string[]
}

const DeleteSmsTemplateDialogContent = ({ closeDialog, ids = [] }: DeleteSmsTemplateDialogContentProps) => {
	const dispatch = useDispatch()

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDeleteSmsTemplates, { isLoading }] = useDeleteSmsTemplatesMutation()

	const [promptInputValue, setPromptInputValue] = useState<string>()

	const { count } = useDataViewContext()

	const { filters, searchTerm } = useSelector(({ dataView }) => dataView["sms-templates"])

	const templatesToBeDeletedCount = ids.length || count

	const deleteButtonDisabled = templatesToBeDeletedCount > 1 && promptInputValue !== `${templatesToBeDeletedCount}`

	const onSubmit = async () => {
		if (!templatesToBeDeletedCount) return

		const body: DeleteSmsTemplatesBody = {
			templateFilter: filters,
			templateSearchFilter: getSearchFilter<["name"]>(searchTerm, ["name"]),
			templatesIds: ids,
		}

		await triggerDeleteSmsTemplates(body).unwrap()

		toast.success("Template deleted successfully.")
		dispatch(clearSelection("sms-templates"))

		closeDialog()

		if (closeDropdown !== undefined) closeDropdown()
	}

	return (
		<div className='flex flex-1 flex-col justify-between gap-6 p-2'>
			{templatesToBeDeletedCount > 1 ? (
				<>
					<p className='w-full overflow-x-auto text-base'>
						Are you sure you want to delete <strong>({templatesToBeDeletedCount})</strong> selected templates?
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

export default DeleteSmsTemplateDialogContent
