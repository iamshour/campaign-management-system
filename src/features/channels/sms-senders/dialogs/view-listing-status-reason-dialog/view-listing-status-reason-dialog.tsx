//#region Import
import type { SmsListingType } from "@/features/channels/common/types"

import { Dialog } from "@/ui"
import { useTranslation } from "react-i18next"

import ViewListingStatusReasonDialogContent from "./view-listing-status-reason-dialog-content"

//#endregion

interface ViewListingStatusReasonDialogProps extends Pick<SmsListingType, "listingId" | "status"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ViewListingStatusReasonDialog = ({ children, status, ...props }: ViewListingStatusReasonDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.viewListingStatusReasonDialog" })

	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='w-[412px]' title={t(`${status}.title`)}>
				<ViewListingStatusReasonDialogContent {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ViewListingStatusReasonDialog
