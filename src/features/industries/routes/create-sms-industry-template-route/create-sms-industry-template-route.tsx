//#region Import
import { lazy } from "react"
import { useSearchParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const CreateSmsIndustryTemplateView = lazy(
	() => import("@/features/industries/views/create-sms-industry-template-view/create-sms-industry-template-view")
)
//#endregion

const CreateSmsIndustryTemplateRoute = () => {
	const [searchParams] = useSearchParams()
	const templateId = searchParams.get("templateId") ?? ""

	const { defaultValues, isFetching, isError, error } = useGetSmsIndustryTemplateByIdQuery(templateId, {
		skip: !templateId?.length,
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

	return <CreateSmsIndustryTemplateView defaultValues={defaultValues} />
}

export default CreateSmsIndustryTemplateRoute
