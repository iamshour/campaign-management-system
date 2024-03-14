//#region Import
import { Dialog } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const CreateChannelSourceRequestDialogContent = lazy(() => import("./create-channel-source-request-dialog-content"))
//#endregion

interface CreateChannelSourceRequestDialogProps
	extends Pick<
		React.ComponentPropsWithoutRef<typeof CreateChannelSourceRequestDialogContent>,
		"defaultValues" | "formType"
	> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode

	/**
	 * Callback function used to close the outer dialog
	 */
	closeActivateSmsDialog?: () => void
}

const CreateChannelSourceRequestDialog = ({
	children,
	closeActivateSmsDialog,
	formType,
	...props
}: CreateChannelSourceRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.createChannelSourceRequestDialog` })

	const [open, setOpen] = useState(false)

	const { closeDropdown } = useDropdownStateContext()

	const onCloseDialog = () => {
		// close outer dialog ("Activate")
		closeActivateSmsDialog && closeActivateSmsDialog()

		// close action drop-down
		closeDropdown && closeDropdown()

		// close CreateChannelSourceRequestDialog
		setOpen(false)
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[723.8px] w-[382px] sm:h-[521.8px] sm:w-[746px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t(`title.${formType}`)}>
				<CreateChannelSourceRequestDialogContent closeDialog={onCloseDialog} formType={formType} {...props} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateChannelSourceRequestDialog
