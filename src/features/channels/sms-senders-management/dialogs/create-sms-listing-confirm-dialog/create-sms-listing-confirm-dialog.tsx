//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const CreateSmsListingConfirmDialogContent = lazy(() => import("./create-sms-listing-confirm-dialog-content"))
//#endregion

interface CreateSmsListingConfirmDialogProps
	extends Required<Pick<React.ComponentPropsWithRef<typeof Dialog>, "onOpenChange" | "open">>,
		Pick<React.ComponentPropsWithoutRef<typeof CreateSmsListingConfirmDialogContent>, "data"> {}

const CreateSmsListingConfirmDialog = ({ data, ...props }: CreateSmsListingConfirmDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createSmsListingConfirm" })

	return (
		<Dialog {...props}>
			<Dialog.Content className='h-[922px] w-[1256px]' title={t("title")}>
				<CreateSmsListingConfirmDialogContent closeDialog={() => props.onOpenChange(false)} data={data} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateSmsListingConfirmDialog
