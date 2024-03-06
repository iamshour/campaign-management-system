//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SmsListingRequestDetailsDialogContent = lazy(() => import("./sms-listing-request-details-dialog-content"))
//#endregion

interface SmsListingRequestDetailsDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
	/**
	 * Useful in case we want to trigger this dialog by passing a button as children
	 */
	children?: React.ReactNode
	/**
	 * Contact id passed
	 */
	id?: string
}

const SmsListingRequestDetailsDialog = ({ children, id, ...props }: SmsListingRequestDetailsDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingRequestDetails" })

	if (!id) return

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content className='h-[770.19px] w-[382px] sm:w-[762px]' title={t("title")}>
				<SmsListingRequestDetailsDialogContent id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingRequestDetailsDialog
