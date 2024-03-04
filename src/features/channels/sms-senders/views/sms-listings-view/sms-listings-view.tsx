//#region Import
import { SharedListViewProps } from "@/core/types"
import templateTypesOptions from "@/features/templates/common/constants/template-types-options"
import { TemplateType } from "@/features/templates/common/types"
import { Button, Pagination } from "@/ui"
import { Dispatch, memo, SetStateAction, useState } from "react"
import { twMerge } from "tailwind-merge"

import SmsListingCard from "./sms-listings-card"
//#endregion

interface SmsListingsViewrops extends SharedListViewProps<any> {
	setTypeFilter: Dispatch<SetStateAction<TemplateType>>

	typeFilter: TemplateType | undefined
}

const SmsListingsView = memo(({ count, isFetching, list, setTypeFilter, typeFilter }: SmsListingsViewrops) => {
	const [paginationState, setPaginationState] = useState<{ limit?: number; offset?: number }>({ limit: 25, offset: 0 })

	return (
		<div className={twMerge("flex h-full w-full flex-col p-8 pb-0", isFetching && "pointer-events-none opacity-50")}>
			<div className='flex flex-row gap-5'>
				{templateTypesOptions?.map((type) => (
					<Button
						className={typeFilter !== type.value ? "bg-[#F7F7F7] font-normal text-black" : ""}
						onClick={() => setTypeFilter(type.value)}
						variant='secondary'>
						{type.label}
					</Button>
				))}
			</div>

			<div className='flex-1 overflow-y-auto'>
				<div className='mt-8 flex flex-row flex-wrap gap-9 '>
					{list?.map((listing) => <SmsListingCard {...listing} />)}
				</div>
			</div>

			<Pagination
				count={count}
				pagination={{ limit: paginationState?.limit, offset: paginationState?.offset }}
				updatePagination={(pagination) => setPaginationState(pagination)}
			/>
		</div>
	)
})

SmsListingsView.displayName = "SmsListingsView"

export default SmsListingsView
