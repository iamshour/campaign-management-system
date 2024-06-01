//#region Import
import { Dialog } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ImportChannelSourceOptOutDialogContent = lazy(() => import("./import-channel-source-opt-out-dialog-content"))
//#endregion

interface ImportChannelSourceOptOutDialogProps {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode
}

const ImportChannelSourceOptOutDialog = ({ children }: ImportChannelSourceOptOutDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.importChannelSourceOptOut" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Content className='h-[327.8px] w-[481.63px] sm:h-[305.8px]' title={t("title")}>
				<ImportChannelSourceOptOutDialogContent closeDialog={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ImportChannelSourceOptOutDialog
