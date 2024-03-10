//#region Import
import { Button } from "@/ui"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import HeroiconsUsers16Solid from "~icons/heroicons/users-16-solid"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
//#endregion

const AdminListingsViewTopbar = memo(() => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.adminSmsListingsView.table" })

	const { pathname } = useLocation()

	return (
		<div className='flex w-full items-end justify-end gap-4'>
			<Button as='link' state={{ from: pathname }} to='./opted-out' variant='outline'>
				<HeroiconsUsers16Solid />
				{t("secondaryCallToAction")}
			</Button>

			<Button as='link' state={{ from: pathname }} to='./new-sender'>
				<HeroiconsPlus16Solid />
				{t("callToAction")}
			</Button>
		</div>
	)
})

AdminListingsViewTopbar.displayName = "AdminListingsViewTopbar"

export default AdminListingsViewTopbar
