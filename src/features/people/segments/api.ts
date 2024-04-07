//#region Import
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"

import type { CreateSegmentBody, GetSegmentByIdReturnValue, GetSegmentsParams, Segment } from "./types"
//#endregion

const segmentsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		createSegment: builder.mutation<any, CreateSegmentBody>({
			invalidatesTags: (res) => (res ? [{ id: "LIST", type: "Segment" }] : []),
			query: (body) => ({ body, method: "POST", url: "/contact/segment" }),
		}),

		deleteSegment: builder.mutation<any, string>({
			invalidatesTags: (res, error, id) => {
				if (!res) return []

				return [{ id, type: "Segment" }]
			},
			query: (id) => ({ method: "DELETE", url: `/contact/segment/${id}` }),
		}),

		getSegmentById: builder.query<GetSegmentByIdReturnValue, string | undefined>({
			providesTags: (result) => [{ id: result?.id, type: "Segment" }],
			query: (id) => `/contact/segment/${id}`,
			transformResponse,
		}),

		getSegments: builder.query<GetListReturnType<Segment>, GetSegmentsParams>({
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Segment"
				),
			query: (params) => ({ params, url: "/contact/segment" }),
			transformResponse,
		}),

		updateSegment: builder.mutation<any, CreateSegmentBody>({
			invalidatesTags: (res, error, { id }) => {
				if (!res) return []

				return [{ id, type: "Segment" }]
			},
			query: ({ id, ...body }) => ({ body, method: "PUT", url: `/contact/segment/${id}` }),
		}),
	}),
})

export const {
	useCreateSegmentMutation,
	useDeleteSegmentMutation,
	useGetSegmentByIdQuery,
	useGetSegmentsQuery,
	useUpdateSegmentMutation,
} = segmentsApi
