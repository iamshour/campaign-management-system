//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const EditSmsIndustryTemplateView = lazy(
	() => import("@/features/industries/views/edit-sms-industry-template-view/edit-sms-industry-template-view")
)
//#endregion

const EditSmsIndustryTemplateRoute = () => {
	const { templateId } = useParams()

	const { defaultValues, error, isError, isFetching } = useGetSmsIndustryTemplateByIdQuery(templateId ?? "", {
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				backgroundImage: data.backgroundImage,
				body: data?.body,
				language: data.language,
				mostPopular: data.mostPopular,
				name: data.name,
				status: data.status,
				type: data.type,
			},
			...rest,
		}),
		skip: !templateId,
		...baseQueryConfigs,
	})

	if (!!templateId && isFetching) return <FullViewSkeleton />

	if (!!templateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <EditSmsIndustryTemplateView defaultValues={defaultValues} />
}

export default EditSmsIndustryTemplateRoute
