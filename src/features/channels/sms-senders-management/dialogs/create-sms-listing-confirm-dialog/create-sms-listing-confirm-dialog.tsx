//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const CreateSmsListingConfirmDialogContent = lazy(() => import("./create-sms-listing-confirm-dialog-content"))
//#endregion

interface CreateSmsListingConfirmDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof CreateSmsListingConfirmDialogContent>, "data"> {
	open: boolean

	setHighlightedErrorRow: React.Dispatch<React.SetStateAction<string | undefined>>

	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateSmsListingConfirmDialog = ({
	data,
	open,
	setHighlightedErrorRow,
	setOpen,
}: CreateSmsListingConfirmDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingConfirm" })

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Content className='h-[922px] w-[1256px]' title={t("title")}>
				<CreateSmsListingConfirmDialogContent
					data={data}
					open={open}
					setHighlightedErrorRow={setHighlightedErrorRow}
					setOpen={setOpen}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsListingConfirmDialog
