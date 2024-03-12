//#region Import
import type { ChannelSourceListing, ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import ActivateListingDialog from "@/features/channels/sms-senders/dialogs/activate-listing-dialog/activate-listing-dialog"
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

const DeactivateListingDialog = lazy(
	() => import("@/features/channels/sms-senders/dialogs/deactivate-listing-dialog/deactivate-listing-dialog")
)

const ResendChannelSourceRequestDialog = lazy(
	() =>
		import(
			"@/features/channels/sms-senders/dialogs/resend-channel-source-request-dialog/resend-channel-source-request-dialog"
		)
)
//#endregion

const ListingActions = ({
	active,
	channelSourceListingStatus,
	id,
}: Pick<ChannelSourceListing, "active" | "channelSourceListingStatus" | "id">) => {
	const { t } = useTranslation("sms-senders")

	return (
		<ActionsDropdown className='m-4'>
			<ViewListingSampleContentDialog id={id}>
				<ActionsDropdown.Item>{t("views.channelSourceView.actions.viewSampleContent")}</ActionsDropdown.Item>
			</ViewListingSampleContentDialog>

			{allowedActionsPerStatusMap["VIEW_STATUS_REASON"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					<ViewListingStatusReasonDialog channelSourceListingStatus={channelSourceListingStatus} id={id}>
						<ActionsDropdown.Item>
							{t(`views.channelSourceView.actions.viewStatusReason.${channelSourceListingStatus}`)}
						</ActionsDropdown.Item>
					</ViewListingStatusReasonDialog>
				</>
			)}

			{active === false && (
				<>
					<ActionsDropdown.Separator />

					<ActivateListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.channelSourceView.actions.activate`)}</ActionsDropdown.Item>
					</ActivateListingDialog>
				</>
			)}

			{active && allowedActionsPerStatusMap["DEACTIVATE_LISTING"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					<DeactivateListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.channelSourceView.actions.deactivate`)}</ActionsDropdown.Item>
					</DeactivateListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["RESEND_REQUEST"].includes(channelSourceListingStatus) && (
				<>
					<ActionsDropdown.Separator />

					<ResendChannelSourceRequestDialog listingId={id}>
						<ActionsDropdown.Item>{t(`views.channelSourceView.actions.resendRequest`)}</ActionsDropdown.Item>
					</ResendChannelSourceRequestDialog>
				</>
			)}
		</ActionsDropdown>
	)
}

export default ListingActions

type ActionType = "DEACTIVATE_LISTING" | "RESEND_REQUEST" | "VIEW_STATUS_REASON"

/**
 * A mapping object used to allow specific user actions based on passed listing status
 */
const allowedActionsPerStatusMap: Record<ActionType, ChannelSourceListingStatus[]> = {
	DEACTIVATE_LISTING: ["APPROVED", "BLOCKED", "REJECTED", "SUSPENDED"],
	RESEND_REQUEST: ["REJECTED", "SUSPENDED"],
	VIEW_STATUS_REASON: ["BLOCKED", "REJECTED", "SUSPENDED"],
}
