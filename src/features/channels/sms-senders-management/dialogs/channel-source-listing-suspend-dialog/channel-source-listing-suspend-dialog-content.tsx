//#region Import
import type { SmsLisintgActionReasonSchemaType } from "@/features/channels/sms-senders-management/schemas/sms-listing-action-reason-schema"

import getCountryName from "@/core/utils/get-country-name"
import { ChannelSourceListing } from "@/features/channels/common/types/data.types"
import { useUpdateChannelSourceListingStatusMutation } from "@/features/channels/sms-senders-management/api"
import ActionReasonForm from "@/features/channels/sms-senders-management/components/action-reason-form"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { Trans, useTranslation } from "react-i18next"
//#endregion

export interface ChannelSourceListingSuspendDialogContentProps extends Pick<ChannelSourceListing, "country" | "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const ChannelSourceListingSuspendDialogContent = ({
	closeDialog,
	country,
	id,
}: ChannelSourceListingSuspendDialogContentProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "dialogs.channelSourceListingSuspend" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerUpdateChannelSourceListingStatus, { isLoading }] = useUpdateChannelSourceListingStatusMutation()

	const onSubmit = async ({ reason }: SmsLisintgActionReasonSchemaType) => {
		await triggerUpdateChannelSourceListingStatus({
			channelSourceListingId: id,
			channelSourceListingStatus: "SUSPENDED",
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
					i18nKey='senders-management:dialogs.channelSourceListingSuspend.message'
					values={{ country: getCountryName(country) }}
				/>
			}
			onSubmit={onSubmit}>
			<Button className='ms-auto w-full shrink-0 px-10 sm:w-max' loading={isLoading} type='submit'>
				{t("submit")}
			</Button>
		</ActionReasonForm>
	)
}

export default ChannelSourceListingSuspendDialogContent
