//#region Import
import { Button } from "@/ui"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
//#endregion

const AdminChannelSourcesViewTopbar = memo(() => {
	const { t } = useTranslation("senders-management")

	const { pathname } = useLocation()

	return (
		<div className='flex w-full items-end justify-end'>
			<Button as='link' state={{ from: pathname }} to='./new-sender'>
				<HeroiconsPlus16Solid />
				{t("views.adminChannelSourcesView.table.callToAction")}
			</Button>
		</div>
	)
})

AdminChannelSourcesViewTopbar.displayName = "AdminChannelSourcesViewTopbar"

export default AdminChannelSourcesViewTopbar
