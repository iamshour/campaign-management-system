//#region Import
import { Dialog, Tooltip } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const SmsListingRequestApproveDialogContent = lazy(() => import("./sms-listing-request-approve-dialog-content"))
//#endregion

interface SmsListingRequestApproveDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsListingRequestApproveDialogContent>, "requestId"> {
	children: React.ReactNode
}

const SmsListingRequestApproveDialog = ({ children, requestId }: SmsListingRequestApproveDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.listingRequestApprove" })

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Tooltip align='center' content={t("tooltip")} side='top' sideOffset={8}>
				<Dialog.Trigger className='h-max w-max rounded-md p-1.5 text-base text-[#939393] transition-basic hover:bg-primary-50/75 hover:text-[#2DAEF5]'>
					{children}
				</Dialog.Trigger>
			</Tooltip>

			<Dialog.Content className='w-[395px] xs:h-[209px] sm:h-[217px]' title={t("title")}>
				<SmsListingRequestApproveDialogContent closeDialog={() => setOpen(false)} requestId={requestId} />
			</Dialog.Content>
		</Dialog>
	)
}

export default SmsListingRequestApproveDialog
