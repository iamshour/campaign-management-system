//#region Import
import { Dialog } from "@/ui"
import { useTranslation } from "react-i18next"

import ViewListingSampleContentDialogContent from "./view-listing-sample-content-dialog-content"

//#endregion

interface ViewListingSampleContentDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ViewListingSampleContentDialogContent>, "listingId"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const ViewListingSampleContentDialog = ({ children, ...props }: ViewListingSampleContentDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.viewListingSampleContentDialog" })

	return (
		<Dialog>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content className='w-[412px]' title={t(`title`)}>
				<ViewListingSampleContentDialogContent {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ViewListingSampleContentDialog
