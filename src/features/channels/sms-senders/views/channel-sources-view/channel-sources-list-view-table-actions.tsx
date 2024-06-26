//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import CreateChannelSourceRequestDialog from "@/features/channels/sms-senders/dialogs/create-channel-source-request-dialog/create-channel-source-request-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
//#endregion

const ChannelSourcesListViewTableActions = ({
	channelSourceName,
	id,
}: Pick<ChannelSource, "channelSourceName" | "id">) => {
	const { t } = useTranslation("sms-senders")

	const navigate = useNavigate()

	return (
		<ActionsDropdown>
			<CreateChannelSourceRequestDialog defaultValues={{ sender: channelSourceName }} formType='addRequest'>
				<ActionsDropdown.Item>{t("table.actions.addRequest")}</ActionsDropdown.Item>
			</CreateChannelSourceRequestDialog>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(id)}>{t("table.actions.viewAllTypes")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default ChannelSourcesListViewTableActions
