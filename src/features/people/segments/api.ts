//#region Import
import api from "@/core/lib/redux-toolkit/api"
import { providesList, transformResponse } from "@/core/lib/redux-toolkit/helpers"
import type { GetListReturnType } from "@/core/lib/redux-toolkit/types"

import type { GetSegmentsParams, GetSegmentByIdReturnValue, Segment, CreateSegmentBody } from "./types"
//#endregion

const segmentsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSegments: builder.query<GetListReturnType<Segment>, GetSegmentsParams>({
			query: (params) => ({ url: "/contact/segment", params }),
			providesTags: (result) =>
				providesList(
					result?.list?.map(({ id }) => id),
					"Segment"
				),
			transformResponse,
		}),

		getSegmentById: builder.query<GetSegmentByIdReturnValue, string | undefined>({
			query: (id) => `/contact/segment/${id}`,
			providesTags: (result) => [{ type: "Segment", id: result?.id }],
			transformResponse,
		}),

		createSegment: builder.mutation<any, CreateSegmentBody>({
			query: (body) => ({ url: "/contact/segment", method: "POST", body }),
			invalidatesTags: (res) => (res ? [{ type: "Segment", id: "LIST" }] : []),
		}),

		updateSegment: builder.mutation<any, CreateSegmentBody>({
			query: ({ id, ...body }) => ({ url: `/contact/segment/${id}`, method: "PUT", body }),
			invalidatesTags: (res, error, { id }) => {
				if (!res) return []

				return [{ type: "Segment", id }]
			},
		}),

		deleteSegment: builder.mutation<any, string>({
			query: (id) => ({ url: `/contact/segment/${id}`, method: "DELETE" }),
			invalidatesTags: (res, error, id) => {
				if (!res) return []

				return [{ type: "Segment", id }]
			},
		}),
	}),
})

export const {
	useGetSegmentsQuery,
	useGetSegmentByIdQuery,
	useCreateSegmentMutation,
	useUpdateSegmentMutation,
	useDeleteSegmentMutation,
} = segmentsApi
