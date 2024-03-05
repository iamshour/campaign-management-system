//#region Import

import type { SmsListingStatus } from "@/features/channels/common/types"

import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import getCountryName from "@/core/utils/get-country-name"
import { Skeleton } from "@/ui"
import { lazy, Suspense } from "react"

import type { SmsListingType } from "../../types"

import smsListingsStatusesColorsMap from "../../constants/sms-listings-statuses-colors-map"

const SmsListingActions = lazy(() => import("./sms-listing-actions"))
//#endregion

const SmsListingCard = (smsListing: SmsListingType) => {
	const { requestStatus, status, statusChangeDate, targetCountry } = smsListing

	const color = smsListingsStatusesColorsMap[status] || "#EDF3F7"

	const countryName = getCountryName(targetCountry)

	const listingStatus: SmsListingStatus = requestStatus === "PENDING" ? "Pending" : status

	return (
		<div className='flex h-[80px] w-[445px] max-w-full flex-row items-center rounded-md bg-[#F7F7F7]'>
			<div className={`h-full w-2 rounded-s-md`} style={{ backgroundColor: color }} />
			<ul className='flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Target Country:</span>
					<span className='block max-w-28 truncate' title={countryName}>
						{countryName}
					</span>
					<span style={{ color: color }}>({listingStatus})</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>Creation date:</span>
					<span className='block truncate'>
						<DataViewDateCell date={statusChangeDate} dateFormat='MM-dd-yyyy | hh:mm aaa' />
					</span>
				</li>
			</ul>

			<Suspense fallback={<Skeleton className='h-[30px] w-[30px]' />}>
				<SmsListingActions {...smsListing} />
			</Suspense>
		</div>
	)
}

export default SmsListingCard
