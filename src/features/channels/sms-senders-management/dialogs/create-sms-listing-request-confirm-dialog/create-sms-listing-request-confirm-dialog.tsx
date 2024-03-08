//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const CreateSmsListingRequestConfirmDialogContent = lazy(
	() => import("./create-sms-listing-request-confirm-dialog-content")
)
//#endregion

interface CreateSmsListingRequestConfirmDialogProps
	extends Required<Pick<React.ComponentPropsWithRef<typeof Dialog>, "onOpenChange" | "open">>,
		Pick<React.ComponentPropsWithoutRef<typeof CreateSmsListingRequestConfirmDialogContent>, "data"> {}

const CreateSmsListingRequestConfirmDialog = ({ data, ...props }: CreateSmsListingRequestConfirmDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingRequestConfirm" })

	return (
		<Dialog {...props}>
			<Dialog.Content className='h-[922px] w-[1256px]' title={t("title")}>
				<CreateSmsListingRequestConfirmDialogContent closeDialog={() => props.onOpenChange(false)} data={data} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsListingRequestConfirmDialog
