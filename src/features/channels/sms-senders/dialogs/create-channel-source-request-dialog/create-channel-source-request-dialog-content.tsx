//#region Import
import type { AddChannelSourceRequestBody } from "@/features/channels/sms-senders/types/api.types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import { ChannelSourceRequestSchemaType } from "@/features/channels/common/schemas/channel-source-request-schema"
import { useAddChannelSourceRequestMutation } from "@/features/channels/sms-senders/api"
import ChannelSourceRequestForm from "@/features/channels/sms-senders/components/channel-source-request-form"
import ConfirmRequestDialog from "@/features/channels/sms-senders/dialogs/confirm-request-dialog/confirm-request-dialog"
import { Button, type UseFormReturn } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
//#endregion

export interface CreateChannelSourceRequestDialogContentProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ChannelSourceRequestForm>, "defaultValues"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	formType: Extract<
		React.ComponentPropsWithoutRef<typeof ConfirmRequestDialog>["formType"],
		"addRequest" | "newRequest"
	>
}

type ButtonClicked = "multiRequest" | "singleRequest"

const CreateChannelSourceRequestDialogContent = ({
	closeDialog,
	formType = "newRequest",
	...props
}: CreateChannelSourceRequestDialogContentProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.createChannelSourceRequestDialog` })

	const { channelSourceId } = useParams()

	const { channelType } = useGetChannelType()

	const [triggerChannelSourceRequest, { isLoading }] = useAddChannelSourceRequestMutation()

	// tracking which button was clicked to show appropriate loader
	const [buttonClicked, setButtonClicked] = useState<ButtonClicked | undefined>()

	/**
	 * Used to send validated data from the `ChannelSourceRequestForm` component to the server, for adding the request entry
	 *
	 * @param body Validated data passed back from the `ChannelSourceRequestForm` component
	 * @param form form passed from the `ChannelSourceRequestForm` component, which we can access to reset from data, or handle other
	 *             actions such as sending back an error on a specific field
	 */
	const onSubmit = async (
		data: ChannelSourceRequestSchemaType,
		form: UseFormReturn<ChannelSourceRequestSchemaType>
	) => {
		if (!data) return

		const body: AddChannelSourceRequestBody = {
			channelSource: data.sender,
			channelSourceId: formType === "addRequest" ? channelSourceId : undefined,
			channelSourceRequestRoute: {
				country: data.country,
				sample: data.sampleContent,
				templateType: data.templateType,
			},
			channelType,
			companyId: "018dcbb3-d316-7c84-8e34-ee452339c468",
			note: data.note,
		}

		await triggerChannelSourceRequest(body).unwrap()

		form.reset()

		// Sending appropriate success message based on button clicked (Add single request, or add multiple)
		toast.success(t(`message.${buttonClicked}Success`))

		if (buttonClicked === "singleRequest") closeDialog()

		setButtonClicked(undefined)
	}

	return (
		<ChannelSourceRequestForm {...props}>
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
		</ChannelSourceRequestForm>
	)
}

export default CreateChannelSourceRequestDialogContent
