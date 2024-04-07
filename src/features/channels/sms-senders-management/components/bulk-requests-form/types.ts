//#region Import
import type { AddBulkChannelSourceRequestsBody } from "@/features/channels/sms-senders-management/types/api.types"
import type { OptionType } from "@/ui"
//#endregion

export type ListingError = { errorIdx: number; errorMessage: string }

export type BulkPreviewData = Omit<
	AddBulkChannelSourceRequestsBody,
	"channelSource" | "channelSourceRequestRouteList" | "companyId" | "userId"
> & {
	channelSource?: string
	channelSourceRequestRouteList: (AddBulkChannelSourceRequestsBody["channelSourceRequestRouteList"][number] & {
		errorKey: string
	})[]
	company: OptionType
	email?: OptionType
}
