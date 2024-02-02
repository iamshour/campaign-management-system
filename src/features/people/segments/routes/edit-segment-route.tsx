//#region Import
import { NotFoundError } from "@/ui"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"

import { useGetSegmentByIdQuery } from "../api"
import SegmentFunnelSkeleton from "../components/segment-funnel-skeleton"
import EditableSegmentView from "../views/editable-segment-view"
//#endregion

const EditSegmentRoute = () => {
	const { id } = useParams()

	const { defaultValues, isInitialLoading, isReady, isError } = useGetSegmentByIdQuery(id, {
		skip: !id,
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			defaultValues: {
				name: data?.name,
				description: data?.description,
				conditions: data?.contactSegmentConditionDetailsList?.map((condition) => ({
					id: condition?.id,
					rules: condition?.contactSegmentRuleDetailsList?.map((rule) => ({
						id: rule?.id,
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
			},

			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && !!data?.name?.length,
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <SegmentFunnelSkeleton />
	if (isError || !id || !defaultValues?.name) return <NotFoundError className='h-full w-full' />

	if (isReady)
		return (
			<EditableSegmentView
				view='editSegment'
				defaultValues={{ ...defaultValues, id, name: defaultValues?.name as string }}
			/>
		)
}

export default EditSegmentRoute
