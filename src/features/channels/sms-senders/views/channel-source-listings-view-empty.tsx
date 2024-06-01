//#region Import
import ChannelSourceListingsEmptySvg from "@/assets/channel-source-listings-empty.svg?react"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourceListingsViewEmpty = () => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "views.channelSourceListingsViewEmpty" })

	return (
		<div className='flex h-full w-full flex-col p-4'>
			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<ChannelSourceListingsEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("title")}</h3>
				<p className='mb-6 text-center'>{t("text")}</p>
			</div>
		</div>
	)
}

export default ChannelSourceListingsViewEmpty
