//#region Import
import { useDeleteExportMutation } from "@/features/people/exports/api"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface DeleteExportsDialogContentProps {
	/**
	 * Callback passed to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Exports Id For the File we want to delete
	 */
	id: string
}

const DeleteExportsDialogContent = ({ closeDialog, id }: DeleteExportsDialogContentProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "dialogs.deleteExports" })

	const [triggerDeleteExport, { isLoading }] = useDeleteExportMutation()

	const { closeDropdown } = useDropdownStateContext()

	const handleDelete = async () => {
		await triggerDeleteExport(id).unwrap()

		toast.success(t("message.success"))

		closeDialog()
		closeDropdown()
	}

	return (
		<div className='flex h-full flex-col justify-between gap-6 p-2'>
			<p className='w-full overflow-x-auto text-base'>{t("message.warning")}</p>

			<Button className='ms-auto w-full px-10 sm:w-max' loading={isLoading} onClick={handleDelete} type='submit'>
				{t("actions.submit")}
			</Button>
		</div>
	)
}

export default DeleteExportsDialogContent
