//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDeleteSegmentMutation } from "@/features/people/segments/api"
import { Button, Footer } from "@/ui"
//#endregion

export interface DeleteSegmentDialogContentProps {
	/**
	 * Segment Id to be deleted
	 */
	id: string

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const DeleteSegmentDialogContent = ({ id, onClose }: DeleteSegmentDialogContentProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "dialogs.delete-segment" })

	const [triggerDeleteSegment, { isLoading }] = useDeleteSegmentMutation()

	const onSubmit = async () => {
		if (!id) return

		await triggerDeleteSegment(id)
			.unwrap()
			.then(() => {
				onClose()
				toast.success("Segment deleted successfully.")
			})
	}

	return (
		<div className='flex flex-col gap-6 p-2'>
			<p className='w-full overflow-x-auto text-base'>{t("message")}</p>

			<Footer>
				<Button type='submit' className='px-10' onClick={onSubmit} loading={isLoading}>
					{t("actions.submit")}
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteSegmentDialogContent
