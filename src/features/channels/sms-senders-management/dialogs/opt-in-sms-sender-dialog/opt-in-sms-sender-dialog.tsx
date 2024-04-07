//#region Import
import { Dialog, Tooltip } from "@/ui"
import { lazy, memo, useState } from "react"
import { useTranslation } from "react-i18next"

const OptInSmsSenderDialogContent = lazy(() => import("./opt-in-sms-sender-dialog-content"))
//#endregion

interface OptInSmsSenderDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof OptInSmsSenderDialogContent>, "id"> {
	/**
	 * Trigger Button/Element for triggering Contact Dilaog
	 */
	children: React.ReactNode

	/**
	 * Custom Bool check used to show tooltip for Trigger Button if true
	 */
	showTooltip?: boolean
}

const OptInSmsSenderDialog = memo(({ children, id, showTooltip }: OptInSmsSenderDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsOptInSender" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Wrapper tooltip={showTooltip ? t("tooltip") : undefined}>
				<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			</Wrapper>

			<Dialog.Content className='h-[209px] w-[416px] sm:h-[193px]' title={t("title")}>
				<OptInSmsSenderDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
})

OptInSmsSenderDialog.displayName = "OptInSmsSenderDialog"

export default OptInSmsSenderDialog

const Wrapper = memo(({ children, tooltip }: { children: React.ReactNode; tooltip?: string }) => {
	if (!tooltip?.length) return children

	return (
		<Tooltip align='center' content={tooltip} side='top' sideOffset={8}>
			{children}
		</Tooltip>
	)
})

Wrapper.displayName = "Wrapper"
