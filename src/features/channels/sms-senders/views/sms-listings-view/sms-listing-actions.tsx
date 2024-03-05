//#region Import
import { SmsListingStatus } from "@/features/channels/common/types"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import ActivateSmsListingDialog from "../../dialogs/activate-sms-listing-dialog copy/activate-sms-listing-dialog"
import { SmsListingType } from "../../types"

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

	const viewStatusReasonActionStatuses: SmsListingStatus[] = ["Blocked", "Rejected", "Suspended"]

	const activateListingActionStatuses: SmsListingStatus[] = ["Deactivated"]

	const deactivateListingActionStatuses: SmsListingStatus[] = ["Approved", "Blocked", "Rejected", "Suspended"]

	const resendRequestActionStatuses: SmsListingStatus[] = ["Rejected", "Suspended"]

	return (
		<ActionsDropdown className='m-4'>
			<ViewListingSampleContentDialog id={id}>
				<ActionsDropdown.Item>{t("views.smsListingsView.actions.viewSampleContent")}</ActionsDropdown.Item>
			</ViewListingSampleContentDialog>

			{viewStatusReasonActionStatuses.includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ViewListingStatusReasonDialog id={id} status={status}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.viewStatusReason.${status}`)}</ActionsDropdown.Item>
					</ViewListingStatusReasonDialog>
				</>
			)}

			{activateListingActionStatuses.includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ActivateSmsListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.activate`)}</ActionsDropdown.Item>
					</ActivateSmsListingDialog>
				</>
			)}

			{deactivateListingActionStatuses.includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<DeactivateSmsListingDialog id={id}>
						<ActionsDropdown.Item>{t(`views.smsListingsView.actions.deactivate`)}</ActionsDropdown.Item>
					</DeactivateSmsListingDialog>
				</>
			)}

			{resendRequestActionStatuses.includes(status) && (
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
