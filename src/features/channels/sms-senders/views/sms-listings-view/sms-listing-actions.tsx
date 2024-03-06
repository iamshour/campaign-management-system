//#region Import
import type { SmsListingStatus } from "@/features/channels/common/types"
import type { SmsListingType } from "@/features/channels/sms-senders/types"

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

const SmsListingActions = ({ id, note, sampleContent, sender, status, targetCountry, type }: SmsListingType) => {
	const { t } = useTranslation("sms-senders")

	return (
		<ActionsDropdown className='m-4'>
			<ViewListingSampleContentDialog id={id}>
				<ActionsDropdown.Item>{t("views.smsListingsView.actions.viewSampleContent")}</ActionsDropdown.Item>
			</ViewListingSampleContentDialog>

			{allowedActionsPerStatusMap["VIEW_STATUS_REASON"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ViewListingStatusReasonDialog id={id} status={status}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.viewStatusReason.${status}`)}</ActionsDropdown.Item>
					</ViewListingStatusReasonDialog>
				</>
			)}

			{allowedActionsPerStatusMap["ACTIVATE_LISTING"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ActivateSmsListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.activate`)}</ActionsDropdown.Item>
					</ActivateSmsListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["DEACTIVATE_LISTING"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<DeactivateSmsListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.deactivate`)}</ActionsDropdown.Item>
					</DeactivateSmsListingDialog>
				</>
			)}

			{allowedActionsPerStatusMap["RESEND_REQUEST"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<SmsSenderRequestDialog
						defaultValues={{ note, sampleContent, sender, targetCountry, type }}
						formType='resendRequest'>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.resendRequest`)}</ActionsDropdown.Item>
					</SmsSenderRequestDialog>
				</>
			)}
		</ActionsDropdown>
	)
}

export default SmsListingActions

type DialogAction = "ACTIVATE_LISTING" | "DEACTIVATE_LISTING" | "RESEND_REQUEST" | "VIEW_STATUS_REASON"

/**
 * A mapping object used to allow specific user actions based on passed listing status
 */
const allowedActionsPerStatusMap: Record<DialogAction, SmsListingStatus[]> = {
	ACTIVATE_LISTING: ["DEACTIVATED"],
	DEACTIVATE_LISTING: ["APPROVED", "BLOCKED", "REJECTED", "SUSPENDED"],
	RESEND_REQUEST: ["REJECTED", "SUSPENDED"],
	VIEW_STATUS_REASON: ["BLOCKED", "REJECTED", "SUSPENDED"],
}
