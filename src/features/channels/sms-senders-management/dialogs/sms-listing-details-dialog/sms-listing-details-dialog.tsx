//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SmsListingDetailsDialogContent = lazy(() => import("./sms-listing-details-dialog-content"))
//#endregion

interface SmsListingDetailsDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
	/**
	 * Useful in case we want to trigger this dialog by passing a button as children
	 */
	children?: React.ReactNode
	/**
	 * Contact id passed
	 */
	id?: string
}

const SmsListingDetailsDialog = ({ children, id, ...props }: SmsListingDetailsDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingDetails" })

	if (!id) return

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content className='h-[770px] w-[382px] sm:h-[557.59px] sm:w-[762px]' title={t("title")}>
				<SmsListingDetailsDialogContent id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingDetailsDialog
