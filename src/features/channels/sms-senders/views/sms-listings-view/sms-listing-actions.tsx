//#region Import
import type { SmsListingStatus, SmsListingType } from "@/features/channels/common/types"

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

const SmsListingActions = ({
	category,
	country,
	listingId,
	note,
	sampleContent,
	sender,
	status,
}: SmsListingType & Record<"note" | "sender", string>) => {
	const { t } = useTranslation("sms-senders")

	return (
		<ActionsDropdown className='m-4'>
			<ViewListingSampleContentDialog listingId={listingId}>
				<ActionsDropdown.Item>{t("views.smsListingsView.actions.viewSampleContent")}</ActionsDropdown.Item>
			</ViewListingSampleContentDialog>

			{allowedActionsPerStatusMap["VIEW_STATUS_REASON"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ViewListingStatusReasonDialog listingId={listingId} status={status}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.viewStatusReason.${status}`)}</ActionsDropdown.Item>
					</ViewListingStatusReasonDialog>
				</>
			)}

			{allowedActionsPerStatusMap["ACTIVATE_LISTING"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ActivateSmsListingDialog listingId={listingId}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.activate`)}</ActionsDropdown.Item>
					</ActivateSmsListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["DEACTIVATE_LISTING"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<DeactivateSmsListingDialog listingId={listingId}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.deactivate`)}</ActionsDropdown.Item>
					</DeactivateSmsListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["RESEND_REQUEST"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<SmsSenderRequestDialog
						defaultValues={{ category, country, note, sampleContent, sender }}
						formType='resendRequest'>
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
const allowedActionsPerStatusMap: Record<ActionType, SmsListingStatus[]> = {
	ACTIVATE_LISTING: ["DEACTIVATED"],
	DEACTIVATE_LISTING: ["APPROVED", "BLOCKED", "REJECTED", "SUSPENDED"],
	RESEND_REQUEST: ["REJECTED", "SUSPENDED"],
	VIEW_STATUS_REASON: ["BLOCKED", "REJECTED", "SUSPENDED"],
}
