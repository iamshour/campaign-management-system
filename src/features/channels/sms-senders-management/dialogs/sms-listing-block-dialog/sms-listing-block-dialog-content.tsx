//#region Import
import type { SmsListingType } from "@/features/channels/common/types"
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"

import getCountryName from "@/core/utils/get-country-name"
import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useTranslation } from "react-i18next"
//#endregion

export interface SmsListingBlockDialogContentProps extends Pick<SmsListingType, "company" | "country" | "listingId"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const SmsListingBlockDialogContent = ({
	closeDialog,
	company,
	country,
	listingId,
}: SmsListingBlockDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingBlock" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	const onSubmit = async ({ actionReason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateSmsListing({
			listingId,
			status: "BLOCKED",
			statusReason: actionReason,
		}).unwrap()

		closeDropdown()
		closeDialog()
	}

	return (
		<ActionReasonForm message={t("message", { company, country: getCountryName(country) })} onSubmit={onSubmit}>
			<Button className='ms-auto w-max px-10' loading={isLoading} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default SmsListingBlockDialogContent
