//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"

import getCountryName from "@/core/utils/get-country-name"
// import { useUpdateSmsListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useTranslation } from "react-i18next"
//#endregion

export interface ChannelSourceListingBlockDialogProps extends Pick<ChannelSourceListing, "company" | "country" | "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceListingBlockDialog = ({
	closeDialog,
	company,
	country,
	// eslint-disable-next-line
	id,
}: ChannelSourceListingBlockDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.smsListingBlock" })

	const { closeDropdown } = useDropdownStateContext()

	// const [triggerUpdateSmsListing, { isLoading }] = useUpdateSmsListingStatusMutation()

	// eslint-disable-next-line
	const onSubmit = async ({ reason }: SmsLisintgActionReasonSchemaType) => {
		// await triggerUpdateSmsListing({
		// 	listingId,
		// 	status: "BLOCKED",
		// 	statusReason: actionReason,
		// }).unwrap()

		closeDropdown()
		closeDialog()
	}

	return (
		<ActionReasonForm message={t("message", { company, country: getCountryName(country) })} onSubmit={onSubmit}>
			<Button className='ms-auto w-max px-10' loading={false} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default ChannelSourceListingBlockDialog
