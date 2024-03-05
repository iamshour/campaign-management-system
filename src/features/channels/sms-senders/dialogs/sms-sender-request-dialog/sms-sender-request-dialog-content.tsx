//#region Import

import type { AddSmsListingBody } from "@/features/channels/sms-senders/types"

import { useAddSmsListingMutation } from "@/features/channels/sms-senders/api"
import SmsSenderRequestForm from "@/features/channels/sms-senders/components/sms-sender-request-form"
import ConfirmRequestDialog from "@/features/channels/sms-senders/dialogs/confirm-request-dialog/confirm-request-dialog"
import { SmsSenderRequestSchemaType } from "@/features/channels/sms-senders/schemas/sms-sender-request-schema"
import { Button, type UseFormReturn } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsSenderRequestDialogContentProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsSenderRequestForm>, "defaultValues"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

type ButtonClicked = "multiRequest" | "singleRequest"

const SmsSenderRequestDialogContent = ({ closeDialog, ...props }: SmsSenderRequestDialogContentProps) => {
	const { t } = useTranslation("sms-senders")

	const [triggerAddSmsSenderRequest, { isLoading }] = useAddSmsListingMutation()

	// tracking which button was clicked to show appropriate loader
	const [buttonClicked, setButtonClicked] = useState<ButtonClicked | undefined>()

	/**
	 * Used to send validated data from the `SmsSenderRequestForm` component to the server, for adding the request entry
	 *
	 * @param body Validated data passed back from the `SmsSenderRequestForm` component
	 * @param form form passed from the `SmsSenderRequestForm` component, which we can access to reset from data, or handle other
	 *             actions such as sending back an error on a specific field
	 */

	const onSubmit = async (body: AddSmsListingBody, form: UseFormReturn<SmsSenderRequestSchemaType>) => {
		if (!body) return

		await triggerAddSmsSenderRequest(body).unwrap()

		form.reset()

		// Sending appropriate success message based on button clicked (Add single request, or add multiple)
		toast.success(t(`dialogs.smsSenderRequest.message.${buttonClicked}Success`))

		if (buttonClicked === "singleRequest") closeDialog()

		setButtonClicked(undefined)
	}

	return (
		<SmsSenderRequestForm {...props}>
			<ConfirmRequestDialog onSubmit={onSubmit}>
				<Button
					disabled={isLoading}
					loading={isLoading && buttonClicked === "multiRequest"}
					onClick={() => setButtonClicked("multiRequest")}
					type='button'
					variant='outline'>
					{t("dialogs.smsSenderRequest.buttons.multiRequest")}
				</Button>
			</ConfirmRequestDialog>

			<ConfirmRequestDialog onSubmit={onSubmit}>
				<Button
					className='ms-auto'
					disabled={isLoading}
					loading={isLoading && buttonClicked === "singleRequest"}
					onClick={() => setButtonClicked("singleRequest")}
					type='button'>
					{t("dialogs.smsSenderRequest.buttons.singleRequest")}
				</Button>
			</ConfirmRequestDialog>
		</SmsSenderRequestForm>
	)
}

export default SmsSenderRequestDialogContent
