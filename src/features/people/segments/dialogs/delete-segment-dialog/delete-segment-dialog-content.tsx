//#region Import
import { useDeleteSegmentMutation } from "@/features/people/segments/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface DeleteSegmentDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Segment Id to be deleted
	 */
	id: string
}

const DeleteSegmentDialogContent = ({ closeDialog, id }: DeleteSegmentDialogContentProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "dialogs.delete-segment" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDeleteSegment, { isLoading }] = useDeleteSegmentMutation()

	const onSubmit = async () => {
		if (!id) return

		await triggerDeleteSegment(id).unwrap()

		toast.success("Segment deleted successfully.")

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex flex-col gap-6 p-2'>
			<p className='w-full overflow-x-auto text-base'>{t("message")}</p>

			<Button className='ms-auto w-full px-10 sm:w-max' loading={isLoading} onClick={onSubmit} type='submit'>
				{t("actions.submit")}
			</Button>
		</div>
	)
}

export default DeleteSegmentDialogContent
