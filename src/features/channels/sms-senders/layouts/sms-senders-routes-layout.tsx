//#region Import
import { DataTableSkeleton, NavTabs } from "@/ui"
import { Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom"
//#endregion

const SmsSendersRoutesLayout = () => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "components.navTabs" })

	return (
		<div className='flex h-full w-full flex-col'>
			<NavTabs>
				<NavTabs.Item to='/channels/local-sms/senders'>{t("local")}</NavTabs.Item>
				<NavTabs.Item to='/channels/international-sms/senders'>{t("international")}</NavTabs.Item>
			</NavTabs>

			<Suspense fallback={<DataTableSkeleton />}>
				<Outlet />
			</Suspense>
		</div>
	)
}

export default SmsSendersRoutesLayout
