//#region Import
import type { SmsListingType } from "@/features/channels/common/types"
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"

import getCountryName from "@/core/utils/get-country-name"
// import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsListingSuspendDialogContentProps extends Pick<SmsListingType, "country" | "listingId"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

// eslint-disable-next-line
const SmsListingSuspendDialogContent = ({ closeDialog, country, listingId }: SmsListingSuspendDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingSuspend" })

	const { closeDropdown } = useDropdownStateContext()

	// const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	// eslint-disable-next-line
	const onSubmit = async ({ reason }: SmsLisintgActionReasonSchemaType) => {
		// await triggerUpdateSmsListing({
		// 	listingId,
		// 	status: "SUSPENDED",
		// 	statusReason: actionReason,
		// }).unwrap()

		closeDropdown()
		closeDialog()
	}

	return (
		<ActionReasonForm message={t("message", { country: getCountryName(country) })} onSubmit={onSubmit}>
			<Button className='ms-auto w-max shrink-0 px-10' loading={false} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default SmsListingSuspendDialogContent
