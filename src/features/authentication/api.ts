//#region Import
import api from "@/core/lib/redux-toolkit/api"
//#endregion

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
			queryFn: async (body, api, extraOptions, baseQuery) => {
				const response = await baseQuery({ url: "/login", method: "POST", body })

				return response
			},
		}),
	}),
})

export const { useLoginMutation } = authApi
