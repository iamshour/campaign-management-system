//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDeleteExportMutation } from "@/features/people/exports/api"
import { Button, Footer } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
//#endregion

export interface DeleteExportsDialogContentProps {
	/**
	 * Exports Id For the File we want to delete
	 */
	id: string

	/**
	 * Callback passed to close the dialog
	 */
	closeDialog: () => void
}

const DeleteExportsDialogContent = ({ id, closeDialog }: DeleteExportsDialogContentProps) => {
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

			<Footer>
				<Button type='submit' className='px-10' loading={isLoading} onClick={handleDelete}>
					{t("actions.submit")}
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteExportsDialogContent
