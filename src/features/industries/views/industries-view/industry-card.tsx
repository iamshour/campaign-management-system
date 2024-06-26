//#region Import
import type { IndustryType } from "@/features/industries/types"

import { Button } from "@/ui"
import MdiCardText from "~icons/mdi/card-text"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import industryFieldsMap from "../../constants/industry-fields-map"

const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))

const IndustriesViewTableIcon = lazy(
	() => import("@/features/industries/views/industries-view/industries-view-table-icon")
)

const IndustriesViewTableActions = lazy(
	() => import("@/features/industries/views/industries-view/industries-view-table-actions")
)
//#endregion

const IndustryCard = (industry: IndustryType) => {
	const { t } = useTranslation("industries")

	const { color, createdAt, description, id, industryIcon, name } = industry

	return (
		<div className='flex h-[220px] w-[470px] max-w-full flex-col rounded-xl shadow-[0px_0px_6px_#00000021] 3xl:w-[480px]'>
			<div className='flex w-full justify-between gap-2 overflow-hidden border-b border-b-gray-200 p-4'>
				<div className='flex flex-1 items-center gap-4 overflow-hidden'>
					<IndustriesViewTableIcon className='h-[44px] w-[44px]' color={color} industryIcon={industryIcon} />
					<p className='flex-1 truncate text-base font-bold'>{name}</p>
				</div>

				{/* Hide Actions if Industry is default one (named `others` from server)  */}
				{name?.toLocaleLowerCase() !== "others" && <IndustriesViewTableActions className='rotate-90' {...industry} />}
			</div>

			<ul className='w-full flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t(industryFieldsMap.description)}:</span>
					<span className='block truncate' title={description}>
						{description}
					</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t(industryFieldsMap.createdAt)}:</span>
					<DataViewDateCell date={createdAt} dateFormat='MM-dd-yyyy | hh:mm aaa' />
				</li>
			</ul>

			<div className='border-t border-t-gray-200'>
				<Button
					as='link'
					className='w-full rounded-xl rounded-t-none font-bold text-primary-700 hover:text-primary-800'
					size='lg'
					to={`${id}/sms`}
					variant='ghost'>
					<MdiCardText />
					<span>{t("views.industriesView.industryCard.callToAction")}</span>
				</Button>
			</div>
		</div>
	)
}

export default IndustryCard
