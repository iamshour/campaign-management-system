//#region Import
import { Dialog } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourceRequestDialogContent = lazy(() => import("./channel-source-request-dialog-content"))
//#endregion

interface ChannelSourceRequestDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ChannelSourceRequestDialogContent>, "defaultValues" | "formType"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode

	/**
	 * Callback function used to close the outer dialog
	 */
	closeActivateSmsDialog?: () => void
}

const ChannelSourceRequestDialog = ({
	children,
	closeActivateSmsDialog,
	formType,
	...props
}: ChannelSourceRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.channelSourceRequestDialog.${formType}` })

	const [open, setOpen] = useState(false)

	const { closeDropdown } = useDropdownStateContext()

	const onCloseDialog = () => {
		// close outer dialog ("Activate")
		closeActivateSmsDialog && closeActivateSmsDialog()

		// close action drop-down
		closeDropdown && closeDropdown()

		// close ChannelSourceRequestDialog
		setOpen(false)
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[712px] w-[382px] sm:h-[516px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				<ChannelSourceRequestDialogContent closeDialog={onCloseDialog} formType={formType} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ChannelSourceRequestDialog
