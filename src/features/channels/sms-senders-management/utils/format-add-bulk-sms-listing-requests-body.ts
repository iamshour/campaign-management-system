//#region Import
import type { ChannelType } from "@/features/channels/common/types/data.types"

import type { SmsListingRequestCreationPreviewData } from "../components/sms-listing-request-creation-preview"
import type { SmsSenderRequestsForm } from "../routes/create-sms-sender-request-route"
//#endregion

/**
 * Function that takes the listing or listing request body from react hook form and transforms it to the backend format
 * @param data in format SmsSenderRequestsForm
 * @param channelType ("SMS_INTERNATIONAL" | "SMS_LOCAL") to be extracted from url and sent to backend on creation
 *
 * @returns formatted data in backend format (AddBulkSmsListingRequestsBody) but witth additional field errorKey used to locate each listing in form
 *
 */
const formatAddBulkSmsListingRequestsBody = (data: SmsSenderRequestsForm, channelType: ChannelType) => {
	let formattedList: SmsListingRequestCreationPreviewData["channelSourceRequestRouteList"] = []

	data.bulkListingsGroups?.forEach(({ listingsFields, type }, groupIdx) => {
		formattedList = formattedList.concat(
			listingsFields.map((listing, listingIdx) => ({
				channelSourceListingStatus: listing?.status,
				country: listing.country!,
				errorKey: `bulkListingsGroups.${groupIdx}.listingsFields.${listingIdx}`,
				sample: listing.content!,
				templateType: type!,
			}))
		)
	})

	const formattedData: SmsListingRequestCreationPreviewData = {
		channelSource: data.basicInfo.sender,
		channelSourceRequestRouteList: formattedList,
		channelType,
		companyId: data.basicInfo.company.value,
		userId: data.basicInfo.email.value,
	}

	return formattedData
}

export default formatAddBulkSmsListingRequestsBody
