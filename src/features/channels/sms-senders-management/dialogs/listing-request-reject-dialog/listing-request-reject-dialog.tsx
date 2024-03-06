//#region Import
import { Dialog, Tooltip } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
const ListingRequestRejectDialogContent = lazy(() => import("./listing-request-reject-dialog-content"))
//#endregion

interface ListingRequestRejectDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ListingRequestRejectDialogContent>, "id" | "withBlock"> {
	children: React.ReactNode
}

const ListingRequestRejectDialog = ({ children, id, withBlock }: ListingRequestRejectDialogProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: withBlock ? "dialogs.listingRequestRejectAndBlock" : "dialogs.listingRequestReject",
	})

	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Tooltip align='end' content={t("tooltip")} side='top' sideOffset={8}>
				<Dialog.Trigger className='h-max w-max rounded-md p-1.5 text-base text-[#939393] transition-basic hover:bg-primary-50/75 hover:text-[#2DAEF5]'>
					{children}
				</Dialog.Trigger>
			</Tooltip>

			<Dialog.Content className='h-[401px] w-[416px] xs:h-[377px] sm:h-[385px]' title={t("title")}>
				<ListingRequestRejectDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ListingRequestRejectDialog
