//#region Import
import type { FieldValues, UseFormSetError } from "react-hook-form"

import type { BulkPreviewData, ListingError } from "../components/bulk-requests-form/types"
//#endregion

interface getBulkCreationErrorsListType {
	data: BulkPreviewData
	errorsData: Record<string, string>
	setError: UseFormSetError<FieldValues>
}

/**
 * Custom Utility function used to return list of errors to be displayed in Bulk list preview Table
 *
 * @param param0.data Formatted Data passed from parent route
 * @param param0.errorsData Errors Object passed from the server in the following format: { "0": "request already exist", ... }
 * @param param0.setError Setter function from react hook form to set each error on its appropriate entry in the Form
 * @returns
 */
const getBulkCreationErrorsList = ({ data, errorsData, setError }: getBulkCreationErrorsListType): ListingError[] => {
	const errorsListInData = data?.channelSourceRequestRouteList?.map(({ errorKey }) => errorKey)

	const errorsList = Object.entries(errorsData)?.map(([errorIdx, errorMessage]) => {
		setError(errorsListInData[Number(errorIdx)], {
			message: errorMessage,
			type: "backend_error",
		})

		return {
			errorIdx: Number(errorIdx),
			errorMessage,
		}
	})

	return errorsList
}

export default getBulkCreationErrorsList
