//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"

import type { ChannelSource, ChannelType } from "./data.types"
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
