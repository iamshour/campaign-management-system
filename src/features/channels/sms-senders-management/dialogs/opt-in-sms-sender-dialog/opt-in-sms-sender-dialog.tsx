//#region Import
import { Dialog, Tooltip } from "@/ui"
import MaterialSymbolsSyncRounded from "~icons/material-symbols/sync-rounded"
import { lazy, memo, useState } from "react"
import { useTranslation } from "react-i18next"

const OptInSmsSenderDialogContent = lazy(() => import("./opt-in-sms-sender-dialog-content"))
//#endregion

interface OptInSmsSenderDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof OptInSmsSenderDialogContent>, "id"> {}

const OptInSmsSenderDialog = memo(({ id }: OptInSmsSenderDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsOptInSender" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Tooltip align='center' content={t("tooltip")} side='top' sideOffset={8}>
				<Dialog.Trigger className='h-max w-max rounded-md p-1.5 text-base text-[#939393] transition-basic hover:bg-primary-50/75 hover:text-[#2DAEF5]'>
					<MaterialSymbolsSyncRounded />
				</Dialog.Trigger>
			</Tooltip>

			<Dialog.Content className='h-[209px] w-[416px] sm:h-[193px]' title={t("title")}>
				<OptInSmsSenderDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
})

OptInSmsSenderDialog.displayName = "OptInSmsSenderDialog"

export default OptInSmsSenderDialog
