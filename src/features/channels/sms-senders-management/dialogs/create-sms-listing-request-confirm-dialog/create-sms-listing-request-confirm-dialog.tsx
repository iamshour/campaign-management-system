//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const CreateSmsListingRequestConfirmDialogContent = lazy(
	() => import("./create-sms-listing-request-confirm-dialog-content")
)
//#endregion

interface CreateSmsListingRequestConfirmDialogProps
	extends Pick<React.ComponentPropsWithoutRef<typeof CreateSmsListingRequestConfirmDialogContent>, "data"> {
	open: boolean

	setHighlightedErrorRow: React.Dispatch<React.SetStateAction<string | undefined>>

	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateSmsListingRequestConfirmDialog = ({
	data,
	open,
	setHighlightedErrorRow,
	setOpen,
}: CreateSmsListingRequestConfirmDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingRequestConfirm" })

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Content className='h-[922px] w-[1256px]' title={t("title")}>
				<CreateSmsListingRequestConfirmDialogContent
					data={data}
					open={open}
					setHighlightedErrorRow={setHighlightedErrorRow}
					setOpen={setOpen}
				/>
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsListingRequestConfirmDialog
