//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSegmentByIdQuery } from "@/features/people/segments/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const SegmentView = lazy(() => import("@/features/people/segments/views/segment-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SegmentRoute = () => {
	const { id } = useParams()

	const { conditions, description, isError, isInitialLoading, isReady, name } = useGetSegmentByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			conditions: data?.contactSegmentConditionDetailsList?.map((condition) => ({
				rules: condition?.contactSegmentRuleDetailsList?.map((rule) => ({
					attribute: rule?.contactSegmentRuleAttribute,
					condition: rule?.contactSegmentRuleCondition,
					country: rule?.country,
					group: {
						label: rule?.group?.name,
						value: rule?.group?.id,
					},
					segment: {
						label: rule?.contactSegment?.name,
						value: rule?.contactSegment?.id,
					},
					specification: rule?.specification,
				})),
			})),
			description: data?.description,
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.name?.length),
			name: data?.name,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <FullViewSkeleton />

	if (isError || !name?.length) return <DisplayError className='h-full w-full' showReloadButton />

	if (isReady) return <SegmentView conditions={conditions} description={description} name={name} />
}

export default SegmentRoute
