//#region Import
import type { SmsListingStatus, SmsListingType } from "@/features/channels/common/types"

import SmsListingActivateDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-activate-dialog/sms-listing-activate-dialog"
import SmsListingBlockDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-block-dialog/sms-listing-block-dialog"
import SmsListingSuspendDialog from "@/features/channels/sms-senders-management/dialogs/sms-listing-suspend-dialog/sms-listing-suspend-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const AdminSmsListingsTableActions = ({
	status,
	...props
}: Pick<SmsListingType, "company" | "country" | "listingId" | "status">) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.adminSmsListingsView.table.actionsCell" })

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item>{t("edit")}</ActionsDropdown.Item>
			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>

			{(Object.entries(allowedActionsPerStatusMap) as [ActionType, SmsListingStatus[]][]).map(
				([actionType, allowedStatuses]) => {
					if (!status || !allowedStatuses?.includes(status)) return

					if (actionType === "ACTIVATE_LISTING")
						return (
							<ActionWrapper key={actionType}>
								<SmsListingActivateDialog {...props}>
									<ActionsDropdown.Item>{t("activate")}</ActionsDropdown.Item>
								</SmsListingActivateDialog>
							</ActionWrapper>
						)

					if (actionType === "BLOCK_LISTING")
						return (
							<ActionWrapper key={actionType}>
								<SmsListingBlockDialog {...props}>
									<ActionsDropdown.Item>{t("block")}</ActionsDropdown.Item>
								</SmsListingBlockDialog>
							</ActionWrapper>
						)

					if (actionType === "SUSPEND_LISTING")
						return (
							<ActionWrapper key={actionType}>
								<SmsListingSuspendDialog {...props}>
									<ActionsDropdown.Item>{t("suspend")}</ActionsDropdown.Item>
								</SmsListingSuspendDialog>
							</ActionWrapper>
						)
				}
			)}
		</ActionsDropdown>
	)
}

export default AdminSmsListingsTableActions

type ActionType = "ACTIVATE_LISTING" | "BLOCK_LISTING" | "SUSPEND_LISTING"

/**
 * A mapping object used to allow specific user actions based on passed listing status
 */
const allowedActionsPerStatusMap: Record<ActionType, SmsListingStatus[]> = {
	ACTIVATE_LISTING: ["BLOCKED", "PENDING", "REJECTED", "SUSPENDED"],
	BLOCK_LISTING: ["PENDING", "REJECTED", "SUSPENDED", "APPROVED"],
	SUSPEND_LISTING: ["PENDING", "APPROVED"],
}

const ActionWrapper = ({ children }: { children: React.ReactNode }) => (
	<Fragment>
		<ActionsDropdown.Separator />
		{children}
	</Fragment>
)
