//#region Import

import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

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

//#endregion

interface SmsListingActionsProps extends Pick<SmsListingType, "id" | "status"> {}

const SmsListingActions = ({ id, status }: SmsListingActionsProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "views.smsListingsView.actions" })

	return (
		<ActionsDropdown className='m-4'>
			<ViewListingSampleContentDialog id={id}>
				<ActionsDropdown.Item>{t("viewSampleContent")}</ActionsDropdown.Item>
			</ViewListingSampleContentDialog>

			{["Blocked", "Rejected", "Suspended"].includes(status) && (
				<>
					<ActionsDropdown.Separator />

					<ViewListingStatusReasonDialog id={id} status={status}>
						<ActionsDropdown.Item>{t(`viewStatusReason.${status}`)}</ActionsDropdown.Item>
					</ViewListingStatusReasonDialog>
				</>
			)}
		</ActionsDropdown>
	)
}

export default SmsListingActions
