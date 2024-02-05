//#region Import
import { useState } from "react"
import toast from "react-hot-toast"

import { useDeleteSmsTemplatesMutation } from "@/features/templates/sms-templates/api"
import { Button, Footer, Input, Label } from "@/ui"
//#endregion

export interface DeleteTemplateDialogContentProps {
	/**
	 * list of sms template Ids to be deleted
	 */
	ids: string[]

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const DeleteTemplateDialogContent = ({ ids, onClose }: DeleteTemplateDialogContentProps) => {
	const [triggerDeleteSmsTemplates, { isLoading }] = useDeleteSmsTemplatesMutation()
	const [promptInputValue, setPromptInputValue] = useState<string>()

	const onSubmit = async () => {
		if (!ids?.length) return

		// TODO: handle deletion when selection="ALL", to be done based on endpoint when integrating with BE

		// NOTE: deleting endpoint is currently failing because we're using json server
		await triggerDeleteSmsTemplates(ids)
			.unwrap()
			.then(() => {
				onClose()
				toast.success("Template deleted successfully.")
			})
	}

	const deleteButtonDisabled = ids?.length > 1 && promptInputValue !== `${ids.length}`

	return (
		<div className='flex flex-col gap-6 p-2'>
			{ids?.length > 1 ? (
				<>
					<p className='w-full overflow-x-auto text-base'>
						Are you sure you want to delete <strong>({ids.length}) selected</strong> templates? Deleting templates is
						permanent and cannot be undone.
					</p>

					<div>
						<Label>Type {`"${ids.length}"`} to confirm</Label>
						<Input
							size='lg'
							placeholder='Enter number'
							value={promptInputValue}
							onChange={(e) => setPromptInputValue(e.target.value)}
						/>
					</div>
				</>
			) : (
				<p className='w-full overflow-x-auto text-base'>Are you sure you want to delete this template</p>
			)}

			<Footer>
				<Button type='submit' disabled={deleteButtonDisabled} className='px-10' onClick={onSubmit} loading={isLoading}>
					Delete
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteTemplateDialogContent
