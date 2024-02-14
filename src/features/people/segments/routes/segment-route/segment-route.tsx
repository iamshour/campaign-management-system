//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSegmentByIdQuery } from "@/features/people/segments/api"
import { FullViewSkeleton } from "@/ui"

const SegmentView = lazy(() => import("@/features/people/segments/views/segment-view"))
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
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

	if (isInitialLoading) return <FullViewSkeleton />
	if (isError || !name?.length) return <DisplayError className='h-full w-full' showReloadButton />
	if (isReady) return <SegmentView name={name} description={description} conditions={conditions} />
}

export default SegmentRoute
