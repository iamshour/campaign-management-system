//#region Import
import useGetChannelType from "@/core/hooks/useGetChannelType"
import { Button } from "@/ui"
import PhPlusBold from "~icons/ph/plus-bold"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const SmsListingRequestsPendingViewTopbar = memo(() => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.smsListingRequestsPending" })

	const { name, pathname, type } = useGetChannelType()

	return (
		<div>
			<Button as='link' state={{ from: pathname }} to={`/admin/channels/${type}-${name}/listing-requests/new-request`}>
				<PhPlusBold />
				{t("callToAction")}
			</Button>
		</div>
	)
})

SmsListingRequestsPendingViewTopbar.displayName = "SmsListingRequestsPendingViewTopbar"

export default SmsListingRequestsPendingViewTopbar
