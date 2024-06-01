//#region Import
import CompletedListingRequestsEmpty from "@/assets/completed-listing-requests-empty.svg?react"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourceRequestsCompletedEmpty = () => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.channelSourceRequestsCompletedEmpty" })

	return (
		<div className='flex h-full w-full flex-1 flex-col gap-[14px] p-4 flex-center prevent-selection'>
			<CompletedListingRequestsEmpty className='mb-[30px]' />
			<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("headline")}</h3>
			<p className='mb-6 text-center'>{t("message")}</p>
		</div>
	)
}

export default ChannelSourceRequestsCompletedEmpty
