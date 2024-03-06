//#region Import
import PendingListingRequestsEmpty from "@/assets/pending-listing-requests-empty.svg?react"
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const SmsListingRequestsPendingEmpty = () => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views" })

	const { name, pathname, type } = useGetChannelType()

	return (
		<div className='flex h-full w-full flex-col gap-[14px] p-4 flex-center prevent-selection'>
			<PendingListingRequestsEmpty className='mb-[30px]' />
			<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("smsListingRequestsPendingEmpty.headline")}</h3>
			<p className='mb-6 text-center'>{t("smsListingRequestsPendingEmpty.message")}</p>

			<Button
				as='link'
				className='min-w-[200px]'
				size='default'
				state={{ from: pathname }}
				to={`/admin/channels/${type}-${name}/listing-requests/new-request`}>
				{t("smsListingRequestsPending.callToAction")}
			</Button>
		</div>
	)
}

export default SmsListingRequestsPendingEmpty
