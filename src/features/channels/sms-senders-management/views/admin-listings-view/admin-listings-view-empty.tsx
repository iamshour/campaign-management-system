//#region Import
import SmsSendersEmptySvg from "@/assets/sms-senders-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
//#endregion

const AdminListingsViewEmpty = () => {
	const { pathname } = useLocation()

	const { t } = useTranslation("senders-management", { keyPrefix: "views" })

	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints
				labels={[
					"Lorem ipsum dolor sit amet.",
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
				]}
			/>

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<SmsSendersEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("adminSmsSendersViewEmpty.headline")}</h3>
				<p className='mb-6 text-center'>{t("adminSmsSendersViewEmpty.message")}</p>

				<Button as='link' className='h-min px-10 py-3' state={{ from: pathname }} to='./new-sender'>
					{t("adminChannelSourcesView.table.callToAction")}
				</Button>
			</div>
		</div>
	)
}

export default AdminListingsViewEmpty
