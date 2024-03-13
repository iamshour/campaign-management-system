//#region Import
import type { ChannelType } from "@/features/channels/common/types/data.types"

import type { SmsListingRequestCreationPreviewData } from "../components/sms-listing-request-creation-preview"
import type { ChannelSourceRequestBulkSchemaType } from "../schemas/channel-source-request-bulk-schema"
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
	{ basicInfo: { company, email, sender }, bulkListingsGroups }: ChannelSourceRequestBulkSchemaType,
	channelType: ChannelType
) => {
	let formattedList: SmsListingRequestCreationPreviewData["channelSourceRequestRouteList"] = []

	bulkListingsGroups?.forEach(({ listingsFields, templateType }, groupIdx) => {
		formattedList = formattedList.concat(
			listingsFields.map(({ country, sampleContent }, listingIdx) => ({
				// channelSourceListingStatus: listing?.status,
				country,
				errorKey: `bulkListingsGroups.${groupIdx}.listingsFields.${listingIdx}`,
				sample: sampleContent,
				templateType,
			}))
		)
	})

	const formattedData: SmsListingRequestCreationPreviewData = {
		channelSource: sender,
		channelSourceRequestRouteList: formattedList,
		channelType,
		companyId: company.value,
		userId: email.value,
	}

	return formattedData
}

export default formatAddBulkSmsListingRequestsBody
