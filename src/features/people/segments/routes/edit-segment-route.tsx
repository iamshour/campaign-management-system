//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSegmentByIdQuery } from "@/features/people/segments/api"
import SegmentFunnelSkeleton from "@/features/people/segments/components/segment-funnel-skeleton"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const EditableSegmentView = lazy(() => import("@/features/people/segments/views/editable-segment-view"))

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const EditSegmentRoute = () => {
	const { id } = useParams()

	const { defaultValues, isError, isInitialLoading, isReady } = useGetSegmentByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			defaultValues: {
				conditions: data?.contactSegmentConditionDetailsList?.map((condition) => ({
					id: condition?.id,
					rules: condition?.contactSegmentRuleDetailsList?.map((rule) => ({
						attribute: rule?.contactSegmentRuleAttribute,
						condition: rule?.contactSegmentRuleCondition,
						country: rule?.country,
						group: {
							label: rule?.group?.name,
							value: rule?.group?.id,
						},
						id: rule?.id,
						segment: {
							label: rule?.contactSegment?.name,
							value: rule?.contactSegment?.id,
						},
						specification: rule?.specification,
					})),
				})),
				description: data?.description,
				name: data?.name,
			},

			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && !!data?.name?.length,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <SegmentFunnelSkeleton />

	if (isError || !id || !defaultValues?.name) return <DisplayError className='h-full w-full' />

	if (isReady)
		return (
			<EditableSegmentView
				defaultValues={{ ...defaultValues, id, name: defaultValues?.name as string }}
				view='editSegment'
			/>
		)
}

export default EditSegmentRoute
