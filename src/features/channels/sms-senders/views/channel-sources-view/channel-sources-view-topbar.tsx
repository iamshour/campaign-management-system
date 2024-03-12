//#region Import
import ChannelSourceRequestDialog from "@/features/channels/sms-senders/dialogs/channel-source-request-dialog/channel-source-request-dialog"
import { Button } from "@/ui"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourcesViewTopbar = memo(() => {
	const { t } = useTranslation("sms-senders")

	return (
		<div className='flex w-full items-end justify-end'>
			<ChannelSourceRequestDialog formType='newRequest'>
				<Button>
					<HeroiconsPlus16Solid />
					{t("table.actions.requestSender")}
				</Button>
			</ChannelSourceRequestDialog>
		</div>
	)
})

ChannelSourcesViewTopbar.displayName = "ChannelSourcesViewTopbar"

export default ChannelSourcesViewTopbar
