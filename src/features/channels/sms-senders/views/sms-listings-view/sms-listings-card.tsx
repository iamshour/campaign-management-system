//#region Import
import type { ChannelSourceListing, ChannelSourceListingStatus } from "@/features/channels/common/types/data.types"

import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import getCountryName from "@/core/utils/get-country-name"
import smsListingStatusesColorsMap from "@/features/channels/common/constants/sms-listing-statuses-colors-map"
import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { Skeleton } from "@/ui"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"

const SmsListingActions = lazy(() => import("./sms-listing-actions"))
//#endregion

const SmsListingCard = (smsListing: ChannelSourceListing) => {
	const { t } = useTranslation("channels-common")

	const { channelSourceListingStatus, country, lastChannelSourceRequestStatus, updatedAt } = smsListing

	const color = smsListingStatusesColorsMap[channelSourceListingStatus] || "#EDF3F7"

	const countryName = getCountryName(country)

	// const listingStatus: ChannelSourceListingStatus = requestStatus === "PENDING" ? "PENDING" : status
	const listingStatus: ChannelSourceListingStatus =
		lastChannelSourceRequestStatus === "PENDING" ? "NEW" : channelSourceListingStatus

	return (
		<div className='flex h-[80px] w-[445px] max-w-full flex-row items-center rounded-md bg-[#F7F7F7]'>
			<div className={`h-full w-2 rounded-s-md`} style={{ backgroundColor: color }} />
			<ul className='flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("fields.country")}:</span>
					<span className='block max-w-28 truncate' title={countryName}>
						{countryName}
					</span>
					<span style={{ color }}>({t(smsListingStatusesLocaleMap[listingStatus])})</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("fields.createdAt")}</span>

					<DataViewDateCell date={updatedAt} dateFormat='MM-dd-yyyy | hh:mm aaa' />
				</li>
			</ul>

			<Suspense fallback={<Skeleton className='h-[30px] w-[30px]' />}>
				{/* TODO: NOTE AND SENDER MAY NOT BE FETCHED BY API  */}
				<SmsListingActions {...smsListing} />
			</Suspense>
		</div>
	)
}

export default SmsListingCard
