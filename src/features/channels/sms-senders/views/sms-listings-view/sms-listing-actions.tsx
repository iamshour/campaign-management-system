//#region Import
import type { ChannelSourceListing, ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import ActivateSmsListingDialog from "@/features/channels/sms-senders/dialogs/activate-sms-listing-dialog/activate-sms-listing-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const ViewListingSampleContentDialog = lazy(
	() =>
		import(
			"@/features/channels/sms-senders/dialogs/view-listing-sample-content-dialog/view-listing-sample-content-dialog"
		)
)

const ViewListingStatusReasonDialog = lazy(
	() =>
		import(
			"@/features/channels/sms-senders/dialogs/view-listing-status-reason-dialog/view-listing-status-reason-dialog"
		)
)

const DeactivateSmsListingDialog = lazy(
	() => import("@/features/channels/sms-senders/dialogs/deactivate-sms-listing-dialog/deactivate-sms-listing-dialog")
)

const SmsSenderRequestDialog = lazy(
	() => import("@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog")
)
//#endregion

const SmsListingActions = ({ channelSourceListingStatus, country, id, templateType }: ChannelSourceListing) => {
	const { t } = useTranslation("sms-senders")

	return (
		<ActionsDropdown className='m-4'>
			<ViewListingSampleContentDialog id={id}>
				<ActionsDropdown.Item>{t("views.smsListingsView.actions.viewSampleContent")}</ActionsDropdown.Item>
			</ViewListingSampleContentDialog>

			{allowedActionsPerStatusMap["VIEW_STATUS_REASON"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					<ViewListingStatusReasonDialog channelSourceListingStatus={channelSourceListingStatus} id={id}>
						<ActionsDropdown.Item>
							{t(`views.smsListingsView.actions.viewStatusReason.${channelSourceListingStatus}`)}
						</ActionsDropdown.Item>
					</ViewListingStatusReasonDialog>
				</>
			)}

			{allowedActionsPerStatusMap["ACTIVATE_LISTING"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					<ActivateSmsListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.activate`)}</ActionsDropdown.Item>
					</ActivateSmsListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["DEACTIVATE_LISTING"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					<DeactivateSmsListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.deactivate`)}</ActionsDropdown.Item>
					</DeactivateSmsListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["RESEND_REQUEST"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					{/* TODO: FETCH DEFAULT VALUES (SAMPLE CONTENT + NOTE) TO BE PASSED AS DEFAULT VALUES */}
					<SmsSenderRequestDialog defaultValues={{ country, templateType }} formType='resendRequest'>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.resendRequest`)}</ActionsDropdown.Item>
					</SmsSenderRequestDialog>
				</>
			)}
		</ActionsDropdown>
	)
}

export default SmsListingActions

type ActionType = "ACTIVATE_LISTING" | "DEACTIVATE_LISTING" | "RESEND_REQUEST" | "VIEW_STATUS_REASON"

/**
 * A mapping object used to allow specific user actions based on passed listing status
 */
const allowedActionsPerStatusMap: Record<ActionType, ChannelSourceListingStatus[]> = {
	// ACTIVATE_LISTING: ["DEACTIVATED"],
	ACTIVATE_LISTING: ["NEW"],
	DEACTIVATE_LISTING: ["APPROVED", "BLOCKED", "REJECTED", "SUSPENDED"],
	RESEND_REQUEST: ["REJECTED", "SUSPENDED"],
	VIEW_STATUS_REASON: ["BLOCKED", "REJECTED", "SUSPENDED"],
}
