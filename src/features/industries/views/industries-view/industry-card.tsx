//#region Import
import { lazy } from "react"
import { useNavigate } from "react-router"

import { IndustryType } from "@/features/industries/types"
import { Button } from "@/ui"

import MdiCardText from "~icons/mdi/card-text"

const AdvancedTableDateCell = lazy(() => import("@/core/components/advanced-table-date-cell"))
const IndustriesViewTableIcon = lazy(
	() => import("@/features/industries/views/industries-view/industries-view-table-icon")
)
const IndustriesViewTableActions = lazy(
	() => import("@/features/industries/views/industries-view/industries-view-table-actions")
)
//#endregion

const IndustryCard = (industry: IndustryType) => {
	const { id, createdAt, color, icon, name, description } = industry

	const navigate = useNavigate()

	return (
		<div className='flex h-[250px] w-full max-w-full flex-col rounded-xl shadow-[0px_0px_6px_#00000021]'>
			<div className='flex w-full justify-between gap-2 overflow-hidden border-b border-b-gray-200 p-4'>
				<div className='flex flex-1 items-center gap-2 overflow-hidden'>
					<IndustriesViewTableIcon className='h-[44px] w-[44px]' icon={icon} color={color} />
					<p className='flex-1 truncate text-base font-bold'>{name}</p>
				</div>

				<IndustriesViewTableActions {...industry} />
			</div>

			<ul className='w-full flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Industry description:</span>
					<span className='block truncate' title={description}>
						{description}
					</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Creation date and time:</span>
					<AdvancedTableDateCell date={createdAt} />
				</li>
			</ul>

			<div className='border-t border-t-gray-200'>
				<Button
					variant='ghost'
					size='lg'
					className='w-full rounded-xl rounded-t-none font-bold text-primary-700 hover:text-primary-800'
					onClick={() => navigate(id)}>
					<MdiCardText />
					<span>View Templates</span>
				</Button>
			</div>
		</div>
	)
}

export default IndustryCard
