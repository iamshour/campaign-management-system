//#region Import
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import toast from "react-hot-toast"

import { useDeleteIndustryMutation } from "@/features/industries/api"
import type { IndustryType } from "@/features/industries/types"
import { Button, Footer, Input } from "@/ui"
//#endregion

export interface DeleteIndustryDialogContentProps extends Pick<IndustryType, "id" | "name"> {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const DeleteIndustryDialogContent = ({ id, name, onClose }: DeleteIndustryDialogContentProps) => {
	const [deleteIndustry, { isLoading }] = useDeleteIndustryMutation()

	const [promptInputValue, setPromptInputValue] = useState<string>()

	const onSubmit = async () => {
		if (!id) return

		await deleteIndustry(id)
			.unwrap()
			.then(() => {
				onClose()
				toast.success("Industry deleted successfully.")
			})
	}

	return (
		<div className='flex flex-col gap-6 overflow-y-auto p-2'>
			<p className='w-full text-base'>
				Are you sure you want to delete <strong>{`"${name}"`}</strong> from the industries list? Please note that this
				will affect all related templates. Deleting industry is permanent and cannot be undone
			</p>

			<div className='flex flex-col space-y-1'>
				<Label className='font-bold'>Type {`"${name}"`} to confirm</Label>
				<Input
					size='lg'
					placeholder='Enter name'
					value={promptInputValue}
					onChange={(e) => setPromptInputValue(e.target.value)}
				/>
			</div>

			<Footer>
				<Button
					type='submit'
					className='px-10'
					onClick={onSubmit}
					loading={isLoading}
					disabled={promptInputValue !== name}>
					Delete
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteIndustryDialogContent
