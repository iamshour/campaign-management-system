//#region Import
import { Button, Footer} from "@blueai/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDeleteExportMutation } from "@/features/people/exports/api"
//#endregion

export interface DeleteExportsDialogContentProps {
	/**
	 * Exports Id For the File we want to delete
	 */
	id: string

	/**
	 * Closes the actions dropdown in table row
	 */
	closeActionsDropDown: () => void

	/**
	 * Callback passed to close the dialog
	 */
	closeExportDeleteDialog: () => void
}

const DeleteExportsDialogContent = ({
	id,
	closeExportDeleteDialog,
	closeActionsDropDown,
}: DeleteExportsDialogContentProps) => {
	const { t } = useTranslation("exports", { keyPrefix: "dialogs.deleteExports" })
	const [triggerDeleteExport, { isLoading }] = useDeleteExportMutation()

	const handleDelete = async () => {
		await triggerDeleteExport(id)
			.unwrap()
			.then(() => {
				toast.success(t("message.success"))

				closeExportDeleteDialog()
				closeActionsDropDown()
			})
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
