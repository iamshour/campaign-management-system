//#region Import
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"

import getCountryName from "@/core/utils/get-country-name"
import { ChannelSourceRequestAction } from "@/features/channels/common/types/data.types"
import { useUpdateChannelSourceRequestActionMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { ChannelSourceRequest } from "../../types/data.types"
//#endregion

export interface ChannelSourceRequestRejectDialogContentProps
	extends Pick<ChannelSourceRequest, "channelSourceName" | "channelSourceRequestId" | "country"> {
	/**
	 * Boolean used to check if request would only be rejected, or would also be blocked as well
	 */
	action: Extract<ChannelSourceRequestAction, "BLOCK" | "REJECT">

	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceRequestRejectDialogContent = ({
	action,
	channelSourceName,
	channelSourceRequestId,
	closeDialog,
	country,
}: ChannelSourceRequestRejectDialogContentProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: `dialogs.channelSourceRequestRejection.${action}`,
	})

	const [triggerUpdateChannelSourceRequestAction, { isLoading }] = useUpdateChannelSourceRequestActionMutation()

	const onSubmit = async ({ reason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateChannelSourceRequestAction({
			action,
			channelSourceRequestId,
			reason,
		}).unwrap()

		toast.success(t("successToast"))

		closeDialog()
	}

	return (
		<ActionReasonForm
			message={t("message", { country: getCountryName(country), sender: channelSourceName })}
			onSubmit={onSubmit}>
			<Button className='ms-auto w-max px-10' loading={isLoading} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default ChannelSourceRequestRejectDialogContent
