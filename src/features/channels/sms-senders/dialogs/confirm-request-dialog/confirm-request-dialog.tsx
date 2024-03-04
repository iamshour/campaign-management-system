//#region Import
import type { AddSmsListingBody } from "@/features/channels/sms-senders/types"

import { SmsSenderRequestSchemaType } from "@/features/channels/sms-senders/schemas/sms-sender-request-schema"
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
	 * Callback function to be called when user presses confirm
	 */
	onSubmit: (data: AddSmsListingBody, form: UseFormReturn<SmsSenderRequestSchemaType>) => void
}

const ConfirmRequestDialog = ({ children, onSubmit }: ConfirmRequestDialogProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "dialogs.confirmRequestDialog" })

	const [open, setOpen] = useState(false)

	const form = useFormContext<SmsSenderRequestSchemaType>()

	return (
		<Dialog
			onOpenChange={() => {
				if (!open) {
					form.trigger().then((res) => {
						if (res) setOpen(true)
					})
				} else setOpen(false)
			}}
			open={open}>
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
