//#region Import
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"
import type { SmsSenderRequestDetailsType } from "@/features/channels/sms-senders-management/types"

import getCountryName from "@/core/utils/get-country-name"
import { useUpdateSmsSourceRequestMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsListingRequestRejectDialogContentProps
	extends Pick<SmsSenderRequestDetailsType, "country" | "requestId" | "sourceName"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Boolean used to check if request would only be rejected, or would also be blocked as well
	 */
	withBlock?: boolean
}

const SmsListingRequestRejectDialogContent = ({
	closeDialog,
	country,
	requestId,
	sourceName,
	withBlock,
}: SmsListingRequestRejectDialogContentProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: withBlock ? "dialogs.listingRequestRejectAndBlock" : "dialogs.listingRequestReject",
	})

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsSourceRequestMutation()

	const onSubmit = async ({ actionReason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateSmsListing({
			actionReason,
			requestAction: withBlock ? "BLOCK" : "REJECT",
			requestId,
		}).unwrap()

		closeDialog()
	}

	return (
		<ActionReasonForm
			message={t("message", { country: getCountryName(country), sender: sourceName })}
			onSubmit={onSubmit}>
			<Button className='ms-auto w-max px-10' loading={isLoading} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default SmsListingRequestRejectDialogContent
