//#region Import
import type { PaginationAndSorting } from "@/core/lib/redux-toolkit/types"
import type {
	ChannelSourceRequestAction,
	ChannelSourceRequestStatus,
	ChannelType,
} from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"
import type { DateRange } from "@/ui"
import type { Country } from "react-phone-number-input"

import type { ChannelSourceRequest } from "./data.types"
//#endregion

export type ChannelSourceRequestFilter = DateRange & {
	actions?: ChannelSourceRequestAction[]
	channelSourceRequestStatus: ChannelSourceRequestStatus

	channelType: ChannelType
	countries?: Country[]
	templateTypes?: TemplateType[]
}

export type ChannelSourceRequestSearchFilter = {
	any?: true
	ChannelSourceName?: string
	companyName?: string
}

export type GetChannelSourceRequestsParams = PaginationAndSorting<ChannelSourceRequest> &
	ChannelSourceRequestFilter &
	ChannelSourceRequestSearchFilter
