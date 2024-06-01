//#region Import
import ChannelSourceBulkSchema from "../../schemas/channel-source-bulk-schema"
import ChannelSourceListingBulkSchema from "../../schemas/channel-source-listing-bulk-schema"
import ChannelSourceRequestBulkSchema from "../../schemas/channel-source-request-bulk-schema"
//#endregion

export type BulkFunnelKey = "CHANNEL_LISTING" | "CHANNEL_SOURCE_REQUEST" | "CHANNEL_SOURCE"

export type BulkRequestsFormSchemaType =
	| typeof ChannelSourceBulkSchema
	| typeof ChannelSourceListingBulkSchema
	| typeof ChannelSourceRequestBulkSchema

type InfoOptions = "company" | "email" | "sender"
type FieldOptions = "country" | "sampleContent" | "status"

export const defaultEmptyField: Record<BulkFunnelKey, Record<FieldOptions, undefined>> = {
	CHANNEL_LISTING: { country: undefined, sampleContent: undefined, status: undefined },
	CHANNEL_SOURCE: { country: undefined, sampleContent: undefined, status: undefined },
	// eslint-disable-next-line
	// @ts-ignore
	CHANNEL_SOURCE_REQUEST: { country: undefined, sampleContent: undefined },
}

export const fieldsToRender: Record<BulkFunnelKey, { basic: InfoOptions[]; field: FieldOptions[] }> = {
	CHANNEL_LISTING: { basic: ["company"], field: ["country", "sampleContent", "status"] },
	CHANNEL_SOURCE: { basic: ["company", "sender"], field: ["country", "sampleContent", "status"] },
	CHANNEL_SOURCE_REQUEST: { basic: ["company", "sender", "email"], field: ["country", "sampleContent"] },
}

export const bulkRequestsFormSchema: Record<BulkFunnelKey, BulkRequestsFormSchemaType> = {
	CHANNEL_LISTING: ChannelSourceListingBulkSchema,
	CHANNEL_SOURCE: ChannelSourceBulkSchema,
	CHANNEL_SOURCE_REQUEST: ChannelSourceRequestBulkSchema,
}
