//#region Import

import type { AddSmsRequestBody } from "@/features/channels/sms-senders/types"

import { useAddSmsRequestMutation } from "@/features/channels/sms-senders/api"
import SmsSenderRequestForm from "@/features/channels/sms-senders/components/sms-sender-request-form"
import ConfirmRequestDialog from "@/features/channels/sms-senders/dialogs/confirm-request-dialog/confirm-request-dialog"
import { SmsSenderRequestSchemaType } from "@/features/channels/sms-senders/schemas/sms-sender-request-schema"
import { Button, type UseFormReturn } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsSenderRequestDialogContentProps
	extends Pick<React.ComponentPropsWithoutRef<typeof SmsSenderRequestForm>, "defaultValues">,
		Pick<React.ComponentPropsWithoutRef<typeof ConfirmRequestDialog>, "formType"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

type ButtonClicked = "multiRequest" | "singleRequest"

const SmsSenderRequestDialogContent = ({
	closeDialog,
	formType = "newRequest",
	...props
}: SmsSenderRequestDialogContentProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.smsSenderRequestDialog.${formType}` })

	const [triggerAddSmsRequest, { isLoading }] = useAddSmsRequestMutation()

	// tracking which button was clicked to show appropriate loader
	const [buttonClicked, setButtonClicked] = useState<ButtonClicked | undefined>()

	/**
	 * Used to send validated data from the `SmsSenderRequestForm` component to the server, for adding the request entry
	 *
	 * @param body Validated data passed back from the `SmsSenderRequestForm` component
	 * @param form form passed from the `SmsSenderRequestForm` component, which we can access to reset from data, or handle other
	 *             actions such as sending back an error on a specific field
	 */

	const onSubmit = async (body: AddSmsRequestBody, form: UseFormReturn<SmsSenderRequestSchemaType>) => {
		if (!body) return

		await triggerAddSmsRequest(body).unwrap()

		form.reset()

		// Sending appropriate success message based on button clicked (Add single request, or add multiple)
		toast.success(t(`message.${buttonClicked}Success`))

		if (buttonClicked === "singleRequest") closeDialog()

		setButtonClicked(undefined)
	}

	return (
		<SmsSenderRequestForm {...props}>
			{formType !== "resendRequest" && (
				<ConfirmRequestDialog formType={formType} onSubmit={onSubmit}>
					<Button
						disabled={isLoading}
						loading={isLoading && buttonClicked === "multiRequest"}
						onClick={() => setButtonClicked("multiRequest")}
						type='button'
						variant='outline'>
						{t("buttons.multiRequest")}
					</Button>
				</ConfirmRequestDialog>
			)}

			<ConfirmRequestDialog formType={formType} onSubmit={onSubmit}>
				<Button
					className='ms-auto'
					disabled={isLoading}
					loading={isLoading && buttonClicked === "singleRequest"}
					onClick={() => setButtonClicked("singleRequest")}
					type='button'>
					{t("buttons.singleRequest")}
				</Button>
			</ConfirmRequestDialog>
		</SmsSenderRequestForm>
	)
}

export default SmsSenderRequestDialogContent
