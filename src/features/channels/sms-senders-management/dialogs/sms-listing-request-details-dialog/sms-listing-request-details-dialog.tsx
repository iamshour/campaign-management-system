//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const SmsListingRequestDetailsDialogContent = lazy(() => import("./sms-listing-request-details-dialog-content"))
//#endregion

interface SmsListingRequestDetailsDialogProps
	extends React.ComponentPropsWithoutRef<typeof Dialog>,
		React.ComponentPropsWithoutRef<typeof SmsListingRequestDetailsDialogContent> {}

const SmsListingRequestDetailsDialog = ({ children, ids, ...props }: SmsListingRequestDetailsDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingRequestDetails" })

	return (
		<Dialog {...props}>
			{!!children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}
			<Dialog.Content className=' h-[750px] w-[382px] sm:h-[754.19px] sm:w-[762px]' title={t("title")}>
				<SmsListingRequestDetailsDialogContent ids={ids} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingRequestDetailsDialog
