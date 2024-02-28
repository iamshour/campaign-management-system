//#region Import
import { NavTabs } from "@/ui"
import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom"
//#endregion

const SmsChannelsRoutesLayout = () => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "components.navTabs" })

	return (
		<div className='flex h-full w-full flex-col'>
			<NavTabs>
				<NavTabs.Item to='/channels/sms/senders/local'>{t("local")}</NavTabs.Item>
				<NavTabs.Item to='/channels/sms/senders/international'>{t("international")}</NavTabs.Item>
			</NavTabs>

			<Outlet />
		</div>
	)
}

export default SmsChannelsRoutesLayout
