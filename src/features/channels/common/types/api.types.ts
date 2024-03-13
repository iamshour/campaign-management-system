//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { ChannelSource, ChannelSourceListing, ChannelSourceListingStatus, ChannelType } from "./data.types"
//#endregion

export type ChannelSourceFilter = DateRange & {
	channelType: ChannelType
	templateTypes?: TemplateType[]
}

type ChannelSourceSearchFilter = { any?: true; name?: string }

/**
 * Params passed to the `getChannelSources` query, used to fetch Channel Sources
 */
export type GetChannelSourcesParams = ChannelSourceFilter &
	PaginationAndSorting<ChannelSource> &
	ChannelSourceSearchFilter

export type ChannelSourceListingFilter = DateRange & {
	channelSourceListingStatuses?: ChannelSourceListingStatus[]
	countries?: Country[]
	templateTypes?: TemplateType[]
}

type channelSourceListingSearch = { any?: true; companyName?: string }

/**
 * Params passed to the `getChannelSourceListings` query, used to fetch Channel Source Lisitngs by Channel Source ID
 */
export type GetChannelSourceListingsParams = ChannelSourceListingFilter &
	channelSourceListingSearch &
	PaginationAndSorting<ChannelSourceListing> & {
		channelSourceId: string
	}

/**
 * Return type of the `getChannelSourceListings` query, used to fetch Channel Source Lisitngs by Channel Source ID
 */
export type GetChannelSourceListingsReturnType = {
	channelSourceId: string
	channelSourceListings: {
		count: number
		list: ChannelSourceListing[]
	}
	channelSourceName: string
}
