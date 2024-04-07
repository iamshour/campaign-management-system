//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"
import incrementNumberSuffix from "@/utils/increment-number-suffix"
import { lazy } from "react"
import { useSearchParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const CreateSmsIndustryTemplateView = lazy(
	() => import("@/features/industries/views/create-sms-industry-template-view/create-sms-industry-template-view")
)
//#endregion

const CreateSmsIndustryTemplateRoute = () => {
	const [searchParams] = useSearchParams()

	const templateId = searchParams.get("templateId") ?? ""

	const { defaultValues, error, isError, isFetching } = useGetSmsIndustryTemplateByIdQuery(templateId, {
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				backgroundImage: data.backgroundImage,
				body: data?.body,
				language: data.language,
				mostPopular: data.mostPopular,
				name: incrementNumberSuffix(data.name),
				status: data.status,
				type: data.type,
			},
			...rest,
		}),
		skip: !templateId?.length,
		...baseQueryConfigs,
	})

	if (!!templateId && isFetching) return <FullViewSkeleton />

	if (!!templateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <CreateSmsIndustryTemplateView defaultValues={defaultValues} />
}

export default CreateSmsIndustryTemplateRoute
