//#region Import
import ChannelSourceOptOutListViewEmptySvg from "@/assets/channel-source-opt-out-list-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import ImportChannelSourceOptOutDialog from "@/features/channels/sms-senders-management/dialogs/import-channel-source-opt-out-dialog/import-channel-source-opt-out-dialog"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourceOptOutListViewEmpty = () => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.channelSourceOptOutListViewEmpty" })

	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints labels={[t("firstLabelHint"), t("secondLabelHint")]} />

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<ChannelSourceOptOutListViewEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("headline")}</h3>
				<p className='mb-6 text-center'>{t("message")}</p>

				<ImportChannelSourceOptOutDialog>
					<Button className='h-min px-20 py-3' variant='outline'>
						{t("callToAction")}
					</Button>
				</ImportChannelSourceOptOutDialog>
			</div>
		</div>
	)
}

export default ChannelSourceOptOutListViewEmpty
