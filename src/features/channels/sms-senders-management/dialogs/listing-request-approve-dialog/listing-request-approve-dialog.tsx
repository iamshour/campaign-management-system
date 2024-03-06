//#region Import
import { Dialog, Tooltip } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"

const ListingRequestApproveDialogContent = lazy(() => import("./listing-request-approve-dialog-content"))
//#endregion

interface ListingRequestApproveDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ListingRequestApproveDialogContent>, "id"> {
	children: React.ReactNode
}

const ListingRequestApproveDialog = ({ children, id }: ListingRequestApproveDialogProps) => {
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
				<ListingRequestApproveDialogContent closeDialog={() => setOpen(false)} id={id} />
			</Dialog.Content>
		</Dialog>
	)
}

export default ListingRequestApproveDialog
