import { SmsChannelTypeOption } from "../../common/types"
import { ExtendedAddBulkSmsListingRequestsBody } from "../components/sms-listing-request-create-peview/sms-listing-request-create-peview"
import { SmsSenderRequestsForm } from "../routes/create-sms-sender-request-route"

/**
 * Function that takes the listing or listing request body from react hook form and transforms it to the backend format
 * @param data in format SmsSenderRequestsForm
 * @param channelType (local/international) to be taken from url and sent to backend on creation
 *
 * @returns formatted data in backend format (AddBulkSmsListingRequestsBody) but witth additional field listingFormKey used to locate each listing in form
 *
 */
const formatAddBulkSmsListingRequestsBody = (data: SmsSenderRequestsForm, channelType: SmsChannelTypeOption) => {
	let formattedList: ExtendedAddBulkSmsListingRequestsBody["channelSourceRequestRouteList"] = []

	data.bulkListingsGroups?.forEach((group, groupIdx) => {
		const { listingsFields, type } = group

		formattedList = formattedList.concat(
			listingsFields.map((listing, listingIdx) => ({
				channelSourceListingStatus: undefined,

				country: listing.country!,
				listingFormKey: `bulkListingsGroups.${groupIdx}.listingsFields.${listingIdx}`,
				sample: listing.content!,
				templateType: type!,
			}))
		)
	})

	const formattedData: ExtendedAddBulkSmsListingRequestsBody = {
		channelSource: data.basicInfo.sender,
		channelSourceRequestRouteList: formattedList,
		channelType: channelType,
		companyId: data.basicInfo.company,
		email: data.basicInfo.email,
	}

	return formattedData
}

export default formatAddBulkSmsListingRequestsBody
