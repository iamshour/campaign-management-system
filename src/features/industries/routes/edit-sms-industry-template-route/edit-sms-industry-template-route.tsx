//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const EditSmsIndustryTemplateView = lazy(
	() => import("@/features/industries/views/edit-sms-industry-template-view/edit-sms-industry-template-view")
)
//#endregion

const EditSmsIndustryTemplateRoute = () => {
	const { templateId } = useParams()

	const { defaultValues, isFetching, isError, error } = useGetSmsIndustryTemplateByIdQuery(templateId ?? "", {
		skip: !templateId,
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				name: data.name,
				type: data.type,
				language: data.language,
				status: data.status,
				body: data?.body,
				backgroundUrl: data.background,
				mostPopular: data.mostPopular,
			},
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (!!templateId && isFetching) return <FullViewSkeleton />

	if (!!templateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <EditSmsIndustryTemplateView defaultValues={defaultValues} />
}

export default EditSmsIndustryTemplateRoute
