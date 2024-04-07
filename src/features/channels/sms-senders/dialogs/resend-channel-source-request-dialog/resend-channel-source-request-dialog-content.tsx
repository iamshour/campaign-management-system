//#region Import
import type { ChannelSourceRequestSchemaType } from "@/features/channels/common/schemas/channel-source-request-schema"
import type { ResendChannelSourceRequestBody } from "@/features/channels/sms-senders/types/api.types"

import { useResendChannelSourceRequestMutation } from "@/features/channels/sms-senders/api"
import ChannelSourceRequestForm from "@/features/channels/sms-senders/components/channel-source-request-form"
import ConfirmRequestDialog from "@/features/channels/sms-senders/dialogs/confirm-request-dialog/confirm-request-dialog"
import { Button, type UseFormReturn } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface ResendChannelSourceRequestDialogContentProps
	extends Pick<React.ComponentPropsWithoutRef<typeof ChannelSourceRequestForm>, "defaultValues"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Id of the Channel Source listing
	 */
	listingId: string
}

const ResendChannelSourceRequestDialogContent = ({
	closeDialog,
	listingId,
	...props
}: ResendChannelSourceRequestDialogContentProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: `dialogs.resendChannelSourceRequestDialog` })

	const [triggerChannelSourceRequest, { isLoading }] = useResendChannelSourceRequestMutation()

	// tracking which button was clicked to show appropriate loader

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

		const body: ResendChannelSourceRequestBody = {
			channelSourceListingId: listingId,
			note: data.note,
			sample: data.sampleContent,
		}

		await triggerChannelSourceRequest(body).unwrap()

		form.reset()

		toast.success(t(`message`))

		closeDialog()
	}

	return (
		<ChannelSourceRequestForm {...props}>
			<ConfirmRequestDialog formType='resendRequest' onSubmit={onSubmit}>
				<Button className='ms-auto' disabled={isLoading} loading={isLoading} type='button'>
					{t("submit")}
				</Button>
			</ConfirmRequestDialog>
		</ChannelSourceRequestForm>
	)
}

export default ResendChannelSourceRequestDialogContent
