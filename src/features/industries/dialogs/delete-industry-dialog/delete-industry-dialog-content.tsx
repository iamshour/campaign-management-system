//#region Import
import type { IndustryType } from "@/features/industries/types"

import { useDeleteIndustryMutation } from "@/features/industries/api"
import { Button, Input } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import toast from "react-hot-toast"
//#endregion

export interface DeleteIndustryDialogContentProps extends Pick<IndustryType, "id" | "name"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const DeleteIndustryDialogContent = ({ closeDialog, id, name }: DeleteIndustryDialogContentProps) => {
	const [deleteIndustry, { isLoading }] = useDeleteIndustryMutation()

	const { closeDropdown } = useDropdownStateContext()

	const [promptInputValue, setPromptInputValue] = useState<string>()

	const onSubmit = async () => {
		if (!id) return

		await deleteIndustry(id).unwrap()

		toast.success("Industry deleted successfully.")

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex h-full flex-col justify-between gap-6 overflow-y-auto p-2'>
			<p className='w-full text-ellipsis text-base'>
				Are you sure you want to delete <strong className='break-all'>{`"${name}"`}</strong> from the industries list?
				Please note that this will affect all related templates. Deleting industry is permanent and cannot be undone
			</p>

			<div className='flex flex-col space-y-1'>
				<Label className='break-all'>
					Type <span className='cursor-text font-bold'>{`"${name}"`}</span> to confirm
				</Label>
				<Input
					onChange={(e) => setPromptInputValue(e.target.value)}
					placeholder='Enter name'
					size='lg'
					value={promptInputValue}
				/>
			</div>

			<Button
				className='ms-auto w-full px-10 sm:w-max'
				disabled={promptInputValue !== name}
				loading={isLoading}
				onClick={onSubmit}
				type='submit'>
				Delete
			</Button>
		</div>
	)
}

export default DeleteIndustryDialogContent
