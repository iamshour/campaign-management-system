//#region Import
import { ChannelSourceRequestSchemaType } from "@/features/channels/common/schemas/channel-source-request-schema"
import { Button, Dialog } from "@/ui"
import { useState } from "react"
import { useFormContext, UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
//#endregion

interface ConfirmRequestDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode

	/**
	 * Prop to specify whether the form is used to send new request or resending a rejected request
	 * Will be used to display messages and to hide multiRequest button when resending request
	 */
	formType?: "addRequest" | "newRequest" | "resendRequest"

	/**
	 * Callback function to be called when user presses confirm
	 */
	onSubmit: (data: ChannelSourceRequestSchemaType, form: UseFormReturn<ChannelSourceRequestSchemaType>) => void
}

const ConfirmRequestDialog = ({ children, formType, onSubmit }: ConfirmRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.confirmRequestDialog.${formType}` })

	const [open, setOpen] = useState(false)

	const form = useFormContext<ChannelSourceRequestSchemaType>()

	const onOpenChange = () => {
		if (!open) {
			form.trigger().then((res) => {
				if (res) setOpen(true)
			})
		} else setOpen(false)
	}

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className='h-[] w-[438px] sm:h-[] sm:w-[438px]'
				onInteractOutside={(e) => e.preventDefault()}
				title={t(`title`)}>
				<div className='p-2'>
					<p>{t("text")}</p>

					<Button
						className='ms-auto mt-8 block'
						onClick={() => {
							setOpen(false)
							form.handleSubmit((data) => onSubmit(data, form))()
						}}
						type='submit'>
						{t("buttons.confirm")}
					</Button>
				</div>
			</Dialog.Content>
		</Dialog>
	)
}

export default ConfirmRequestDialog
