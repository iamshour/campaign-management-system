//#region Import
import { Dialog } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const SmsSenderRequestDialogContent = lazy(() => import("./sms-sender-request-dialog-content"))
//#endregion

interface SmsSenderRequestDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsSenderRequestDialogContent>, "defaultValues" | "formType"> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode

	/**
	 * Callback function used to close the outer dialog
	 */
	closeActivateSmsDialog?: () => void
}

const SmsSenderRequestDialog = ({
	children,
	closeActivateSmsDialog,
	formType,
	...props
}: SmsSenderRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.smsSenderRequestDialog.${formType}` })

	const [open, setOpen] = useState(false)

	const { closeDropdown } = useDropdownStateContext()

	const onCloseDialog = () => {
		// close outer dialog ("Activate")
		closeActivateSmsDialog && closeActivateSmsDialog()

		// close action drop-down
		closeDropdown && closeDropdown()

		// close SmsSenderRequestDialog
		setOpen(false)
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[712px] w-[382px] sm:h-[516px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t("title")}>
				<SmsSenderRequestDialogContent closeDialog={onCloseDialog} formType={formType} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsSenderRequestDialog
