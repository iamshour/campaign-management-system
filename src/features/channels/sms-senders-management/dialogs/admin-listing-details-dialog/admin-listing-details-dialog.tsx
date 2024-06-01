//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const AdminListingDetailsDialogContent = lazy(() => import("./admin-listing-details-dialog-content"))
//#endregion

interface AdminListingDetailsDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
	/**
	 * Useful in case we want to trigger this dialog by passing a button as children
	 */
	children?: React.ReactNode
	/**
	 * Contact id passed
	 */
	id?: string
}

const AdminListingDetailsDialog = ({ children, id, ...props }: AdminListingDetailsDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.adminListingDetails" })

	if (!id) return

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content className='h-[750px] w-[382px] sm:h-[541.51px] sm:w-[762px]' title={t("title")}>
				<AdminListingDetailsDialogContent id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default AdminListingDetailsDialog
