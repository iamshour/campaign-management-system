//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import SmsSenderRequestDialog from "@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog"
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
			<SmsSenderRequestDialog defaultValues={{ sender: channelSourceName }} formType='addRequest'>
				<ActionsDropdown.Item>{t("table.actions.addRequest")}</ActionsDropdown.Item>
			</SmsSenderRequestDialog>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(id)}>{t("table.actions.viewAllTypes")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default ChannelSourcesListViewTableActions
