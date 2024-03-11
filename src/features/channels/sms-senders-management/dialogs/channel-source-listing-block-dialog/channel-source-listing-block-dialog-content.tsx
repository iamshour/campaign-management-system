//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"

import getCountryName from "@/core/utils/get-country-name"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { Trans, useTranslation } from "react-i18next"

import { useUpdateChannelSourceListingStatusMutation } from "../../api"
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
	id,
}: ChannelSourceListingBlockDialogProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceListingBlock" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerUpdateChannelSourceListingStatus, { isLoading }] = useUpdateChannelSourceListingStatusMutation()

	const onSubmit = async ({ reason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateChannelSourceListingStatus({
			channelSourceListingId: id,
			channelSourceListingStatus: "BLOCKED",
			channelSourceListingStatusReason: reason,
		}).unwrap()

		toast.success(t("successToast"))

		closeDropdown()
		closeDialog()
	}

	return (
		<ActionReasonForm
			message={
				<Trans
					i18nKey='senders-management:dialogs.channelSourceListingBlock.message'
					values={{ company: company.name, country: getCountryName(country) }}
				/>
			}
			onSubmit={onSubmit}>
			<Button className='ms-auto w-max px-10' loading={isLoading} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default ChannelSourceListingBlockDialog
