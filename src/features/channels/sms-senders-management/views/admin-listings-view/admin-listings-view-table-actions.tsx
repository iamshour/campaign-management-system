//#region Import
import type { ChannelSourceListing, ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import ChannelSourceListingActivateDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-listing-activate-dialog/channel-source-listing-activate-dialog"
import ChannelSourceListingBlockDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-listing-block-dialog/channel-source-listing-block-dialog"
import ChannelSourceListingSuspendDialog from "@/features/channels/sms-senders-management/dialogs/channel-source-listing-suspend-dialog/channel-source-listing-suspend-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"

import DeleteChannelSourceListingDialog from "../../dialogs/delete-channel-source-listing-dialog/delete-channel-source-listing-dialog"
//#endregion

const AdminListingsViewTableActions = ({
	channelSourceListingStatus,
	...props
}: Pick<ChannelSourceListing, "channelSourceListingStatus" | "company" | "country" | "id">) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.adminSmsListingsView.table.actionsCell" })

	return (
		<ActionsDropdown>
			<DeleteChannelSourceListingDialog {...props}>
				<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>
			</DeleteChannelSourceListingDialog>

			{(Object.entries(allowedActionsPerStatusMap) as [ActionType, ChannelSourceListingStatus[]][]).map(
				([actionType, allowedStatuses]) => {
					if (!channelSourceListingStatus || !allowedStatuses?.includes(channelSourceListingStatus)) return

					if (actionType === "ACTIVATE_LISTING")
						return (
							<ActionWrapper key={actionType}>
								<ChannelSourceListingActivateDialog country={props.country} id={props.id}>
									<ActionsDropdown.Item>{t("activate")}</ActionsDropdown.Item>
								</ChannelSourceListingActivateDialog>
							</ActionWrapper>
						)

					if (actionType === "BLOCK_LISTING")
						return (
							<ActionWrapper key={actionType}>
								<ChannelSourceListingBlockDialog {...props}>
									<ActionsDropdown.Item>{t("block")}</ActionsDropdown.Item>
								</ChannelSourceListingBlockDialog>
							</ActionWrapper>
						)

					if (actionType === "SUSPEND_LISTING")
						return (
							<ActionWrapper key={actionType}>
								<ChannelSourceListingSuspendDialog country={props.country} id={props.id}>
									<ActionsDropdown.Item>{t("suspend")}</ActionsDropdown.Item>
								</ChannelSourceListingSuspendDialog>
							</ActionWrapper>
						)
				}
			)}
		</ActionsDropdown>
	)
}

export default AdminListingsViewTableActions

type ActionType = "ACTIVATE_LISTING" | "BLOCK_LISTING" | "SUSPEND_LISTING"

/**
 * A mapping object used to allow specific user actions based on passed listing status
 */
const allowedActionsPerStatusMap: Record<ActionType, ChannelSourceListingStatus[]> = {
	ACTIVATE_LISTING: ["BLOCKED", "NEW", "REJECTED", "SUSPENDED"],
	BLOCK_LISTING: ["NEW", "REJECTED", "SUSPENDED", "APPROVED"],
	SUSPEND_LISTING: ["NEW", "APPROVED"],
}

const ActionWrapper = ({ children }: { children: React.ReactNode }) => (
	<Fragment>
		<ActionsDropdown.Separator />
		{children}
	</Fragment>
)
