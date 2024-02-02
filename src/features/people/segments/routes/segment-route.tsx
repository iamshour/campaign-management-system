//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"

import { useGetSegmentByIdQuery } from "../api"
import SegmentViewSkeleton from "../views/segment-view/segment-view-skeleton"

const SegmentView = lazy(() => import("../views/segment-view"))
const NotFoundError = lazy(() => import("@/ui").then((mod) => ({ default: mod.NotFoundError })))
//#endregion

const SegmentRoute = () => {
	const { id } = useParams()

	const { name, description, conditions, isInitialLoading, isReady, isError } = useGetSegmentByIdQuery(id, {
		skip: !id,
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			name: data?.name,
			description: data?.description,
			conditions: data?.contactSegmentConditionDetailsList?.map((condition) => ({
				rules: condition?.contactSegmentRuleDetailsList?.map((rule) => ({
					attribute: rule?.contactSegmentRuleAttribute,
					condition: rule?.contactSegmentRuleCondition,
					specification: rule?.specification,
					country: rule?.country,
					group: {
						label: rule?.group?.name,
						value: rule?.group?.id,
					},
					segment: {
						label: rule?.contactSegment?.name,
						value: rule?.contactSegment?.id,
					},
				})),
			})),
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.name?.length),
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <SegmentViewSkeleton />
	if (isError || !name?.length) return <NotFoundError className='h-full w-full' />
	if (isReady) return <SegmentView name={name} description={description} conditions={conditions} />
}

export default SegmentRoute
