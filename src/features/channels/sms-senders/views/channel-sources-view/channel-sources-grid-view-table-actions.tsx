//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import ChannelSourceRequestDialog from "@/features/channels/sms-senders/dialogs/channel-source-request-dialog/channel-source-request-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourcesGridViewTableActions = ({ channelSourceName }: Pick<ChannelSource, "channelSourceName">) => {
	const { t } = useTranslation("sms-senders")

	return (
		<ActionsDropdown Icon={HeroiconsPlus16Solid} iconClassName='w-5 h-5'>
			<ChannelSourceRequestDialog defaultValues={{ sender: channelSourceName }} formType='addRequest'>
				<ActionsDropdown.Item>{t("table.actions.addRequest")}</ActionsDropdown.Item>
			</ChannelSourceRequestDialog>
		</ActionsDropdown>
	)
}

export default ChannelSourcesGridViewTableActions
