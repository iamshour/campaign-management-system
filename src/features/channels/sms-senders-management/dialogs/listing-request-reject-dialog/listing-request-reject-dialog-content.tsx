//#region Import
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"
import type { SmsListingRequest } from "@/features/channels/sms-senders-management/types"

import getCountryName from "@/core/utils/get-country-name"
import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

export interface ListingRequestRejectDialogContentProps extends Pick<SmsListingRequest, "country" | "id" | "sender"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Boolean used to check if request would only be rejected, or would also be blocked as well
	 */
	withBlock?: boolean
}

const ListingRequestRejectDialogContent = ({
	closeDialog,
	country,
	id,
	sender,
	withBlock,
}: ListingRequestRejectDialogContentProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: withBlock ? "dialogs.listingRequestRejectAndBlock" : "dialogs.listingRequestReject",
	})

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	const onSubmit = async ({ actionReason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateSmsListing({
			listingId: id,
			status: withBlock ? "BLOCKED" : "REJECTED",
			statusReason: actionReason,
		}).unwrap()

		closeDialog()
	}

	return (
		<ActionReasonForm message={t("message", { country: getCountryName(country), sender })} onSubmit={onSubmit}>
			<Button className='ms-auto w-max px-10' loading={isLoading} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default ListingRequestRejectDialogContent
