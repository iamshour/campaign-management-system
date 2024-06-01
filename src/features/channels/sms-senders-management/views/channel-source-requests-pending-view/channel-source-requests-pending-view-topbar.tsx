//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { Button } from "@/ui"
import PhPlusBold from "~icons/ph/plus-bold"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const ChannelSourceRequestsPendingViewTopbar = memo(() => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.channelSourceRequestsPending" })

	const { channelTypeInUrl, pathname } = useGetChannelType()

	return (
		<Button
			as='link'
			state={{ from: pathname }}
			to={`/admin/channels/${channelTypeInUrl}/listing-requests/new-request`}>
			<PhPlusBold />
			{t("callToAction")}
		</Button>
	)
})

ChannelSourceRequestsPendingViewTopbar.displayName = "ChannelSourceRequestsPendingViewTopbar"

export default ChannelSourceRequestsPendingViewTopbar
