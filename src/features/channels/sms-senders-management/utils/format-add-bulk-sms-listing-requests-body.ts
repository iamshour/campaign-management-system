//#region Import
import type { ChannelType } from "@/features/channels/common/types/data.types"

import * as z from "zod"

import type { BulkRequestsFormSchemaType } from "../components/bulk-requests-form/configs"
import type { BulkPreviewData } from "../components/bulk-requests-form/types"

// import type { SmsSenderRequestsForm } from "../routes/create-sms-sender-request-route"
//#endregion

/**
 * Function that takes the listing or listing request body from react hook form and transforms it to the backend format
 * @param data in format SmsSenderRequestsForm
 * @param channelType ("SMS_INTERNATIONAL" | "SMS_LOCAL") to be extracted from url and sent to backend on creation
 *
 * @returns formatted data in backend format (AddBulkSmsListingRequestsBody) but witth additional field errorKey used to locate each listing in form
 *
 */
const formatAddBulkSmsListingRequestsBody = (
	{ basicInfo: { company, ...restBasicInfo }, bulkListingsGroups }: z.infer<BulkRequestsFormSchemaType>,
	channelType: ChannelType
) => {
	let formattedList: BulkPreviewData["channelSourceRequestRouteList"] = []

	bulkListingsGroups?.forEach(({ listingsFields, templateType }, groupIdx) => {
		formattedList = formattedList.concat(
			listingsFields.map(({ country, sampleContent, ...listing }, listingIdx) => ({
				channelSourceListingStatus: ("status" in listing ? listing?.status : undefined) as any,
				country,
				errorKey: `bulkListingsGroups.${groupIdx}.listingsFields.${listingIdx}`,
				sample: sampleContent,
				templateType,
			}))
		)
	})

	const formattedData: BulkPreviewData = {
		channelSource: "sender" in restBasicInfo ? restBasicInfo?.sender : undefined,
		channelSourceRequestRouteList: formattedList,
		channelType,
		company,
		email: "email" in restBasicInfo ? restBasicInfo?.email : undefined,
	}

	return formattedData
}

export default formatAddBulkSmsListingRequestsBody
