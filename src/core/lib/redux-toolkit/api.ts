//#region Import
import API_BASE_URL from "@/core/constants/api-base-url"
import { type BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import toast from "react-hot-toast"

import { getErrorMessage } from "./helpers"

//#endregion

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE_URL,
	// // credentials: "include",
	// prepareHeaders: (headers, { getState }) => {
	// 	// By default, if we have a token in the store, let's use that for authenticated requests
	// 	const token = (getState() as RootState).auth.token
	// 	if (token) {
	// 		headers.set("authentication", `Bearer ${token}`)
	// 	}
	// 	return headers
	// },
})

// We can import retry() from '@reduxjs/toolkit/query/react' and use as a wrapper around baseQuery
// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

const baseQueryWrapper: BaseQueryFn = async (args, api, otherOptions) => {
	const res = await baseQuery(args, api, otherOptions)

	// if (res?.error?.status === 403) {
	// 	console.log("A.T. expired. Calling '/refresh' for a new one ...")

	// 	const refreshResult = await baseQuery("/identity/refresh", api, otherOptions)

	// 	if (refreshResult?.data?.token) {
	// 		const { user } = api.getState().auth

	// 		// storing new token
	// 		api.dispatch(setUser({ token: refreshResult?.data?.token, user }))

	// 		// retrying original query with the new access token
	// 		res = await baseQuery(args, api, otherOptions)
	// 	} else {
	// 		api.dispatch(setUser({ user: {}, token: null }))
	// 	}
	// }

	if (res?.error && res?.error?.status === "FETCH_ERROR") {
		toast.error(getErrorMessage(res?.error as any))
		api.abort()
	}

	// if (!!res.data) return res.data
	return res
}

const api = createApi({
	baseQuery: baseQueryWrapper,
	endpoints: () => ({}),
	reducerPath: "api",
	refetchOnReconnect: true,
	tagTypes: [
		// Related to People Feature
		"Contact",
		"Tag",
		"Group",
		"Segment",
		// Related to Templates Feature
		"SmsTemplate",
		"Industry",
		"SmsIndustryTemplate",
		// Related to Channels Feature
		"ChannelSource",
		"ChannelSourceRequest",
		"ChannelSourceListing",
		"OptInSender",
		"Company",
		"UserInCompany",
	],
})

export default api
