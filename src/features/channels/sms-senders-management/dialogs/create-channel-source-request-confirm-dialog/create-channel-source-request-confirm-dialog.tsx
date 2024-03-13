//#region Import
import { Dialog } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const CreateChannelSourceRequestConfirmDialogContent = lazy(
	() => import("./create-channel-source-request-confirm-dialog-content")
)
//#endregion

interface CreateChannelSourceRequestConfirmDialogProps
	extends Required<Pick<React.ComponentPropsWithRef<typeof Dialog>, "onOpenChange" | "open">>,
		Pick<React.ComponentPropsWithoutRef<typeof CreateChannelSourceRequestConfirmDialogContent>, "data"> {}

const CreateChannelSourceRequestConfirmDialog = ({ data, ...props }: CreateChannelSourceRequestConfirmDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.createChannelSourceRequestConfirm" })

	return (
		<Dialog {...props}>
			<Dialog.Content className='h-[922px] w-[1256px]' title={t("title")}>
				<CreateChannelSourceRequestConfirmDialogContent closeDialog={() => props.onOpenChange(false)} data={data} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateChannelSourceRequestConfirmDialog
