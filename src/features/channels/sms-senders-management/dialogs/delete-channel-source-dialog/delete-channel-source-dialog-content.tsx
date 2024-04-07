//#region Import
import { useDeleteChannelSourceMutation } from "@/features/channels/sms-senders-management/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface DeleteChannelSourceDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Channel Source Id, to be deleted
	 */
	id: string
}

const DeleteChannelSourceDialogContent = ({ closeDialog, id }: DeleteChannelSourceDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.deleteChannelSource" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDeleteChannelSource, { isLoading }] = useDeleteChannelSourceMutation()

	const onSubmit = async () => {
		await triggerDeleteChannelSource(id).unwrap()

		toast.success(t("successToast"))

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex h-full flex-col justify-between gap-6 p-2'>
			<p className='w-full overflow-x-auto text-base'>{t("message")}</p>

			<Button className='ms-auto w-full px-10 sm:w-max' loading={isLoading} onClick={onSubmit} type='submit'>
				{t("submit")}
			</Button>
		</div>
	)
}

export default DeleteChannelSourceDialogContent
