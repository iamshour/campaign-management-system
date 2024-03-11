//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import SmsSenderRequestDialog from "@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourcesGridViewTableActions = ({ channelSourceName }: Pick<ChannelSource, "channelSourceName">) => {
	const { t } = useTranslation("sms-senders")

	return (
		<ActionsDropdown Icon={HeroiconsPlus16Solid} iconClassName='w-5 h-5'>
			<SmsSenderRequestDialog defaultValues={{ sender: channelSourceName }} formType='addRequest'>
				<ActionsDropdown.Item>{t("table.actions.addRequest")}</ActionsDropdown.Item>
			</SmsSenderRequestDialog>
		</ActionsDropdown>
	)
}

export default ChannelSourcesGridViewTableActions
