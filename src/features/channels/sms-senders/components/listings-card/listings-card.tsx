//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import getCountryName from "@/core/utils/get-country-name"
import smsListingStatusesColorsMap from "@/features/channels/common/constants/sms-listing-statuses-colors-map"
import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { ChannelSourceListingDisplayStatus } from "@/features/channels/sms-senders/types/data.types"
import { Skeleton } from "@/ui"
import TablerCircleFilled from "~icons/tabler/circle-filled"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import getListingDisplayStatus from "../../utils/get-listing-display-status"
const ListingCardActions = lazy(() => import("./listing-card-actions"))
//#endregion

const ListingCard = ({
	active,
	channelSourceListingStatus,
	country,
	id,
	lastChannelSourceRequestStatus,
	updatedAt,
}: ChannelSourceListing) => {
	const { t } = useTranslation("channels-common")

	const isInactive = active === false

	const listingStatus = getListingDisplayStatus(channelSourceListingStatus, lastChannelSourceRequestStatus)

	const color = smsListingDisplayStatusesColorsMap[listingStatus] || "#EDF3F7"

	const countryName = getCountryName(country)

	return (
		<div className='relative flex h-[80px] w-[445px] max-w-full flex-row items-center rounded-md bg-[#F7F7F7]'>
			<div className={`h-full min-w-2 rounded-s-md`} style={{ backgroundColor: isInactive ? "#B9B9B9" : color }} />
			<ul className='max-w-[438px] flex-1 space-y-2 p-4 text-[15px]'>
				<li className='flex gap-2'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("fields.country")}:</span>
					<span className={twMerge("block truncate", isInactive ? "max-w-16" : "max-w-28")} title={countryName}>
						{countryName}
					</span>
					<span style={{ color }}>({t(smsListingDisplayStatusesLocaleMap[listingStatus])})</span>

					{isInactive && (
						<span className='border-l-1 flex flex-row items-center gap-2 border-l border-[#707070] pl-2'>
							<TablerCircleFilled className='h-3 w-3 text-[#C9C9C9]' />
							{t("listingStatuses.inactive")}
						</span>
					)}
				</li>
				<li className='flex gap-2'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("fields.createdAt")}</span>

					<DataViewDateCell date={updatedAt} dateFormat='MM-dd-yyyy | hh:mm aaa' />
				</li>
			</ul>

			<Suspense fallback={<Skeleton className='absolute right-0 h-[30px] w-[30px]' />}>
				<ListingCardActions active={active} channelSourceListingStatus={channelSourceListingStatus} id={id} />
			</Suspense>
		</div>
	)
}

export default ListingCard

const smsListingDisplayStatusesLocaleMap: Record<ChannelSourceListingDisplayStatus, string> = {
	...smsListingStatusesLocaleMap,
	PENDING: "channels-common:listingStatuses.pending",
}

const smsListingDisplayStatusesColorsMap: Record<ChannelSourceListingDisplayStatus, string> = {
	...smsListingStatusesColorsMap,
	PENDING: "#2DAEF5",
}
