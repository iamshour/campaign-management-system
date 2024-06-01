//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsPrebuiltTemplateView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-template-view/sms-prebuilt-template-view")
)
//#endregion

const SmsPrebuiltTemplateRoute = () => {
	const { templateId } = useParams()

	const { data, error, isFetching, showError } = useGetSmsIndustryTemplateByIdQuery(templateId!, {
		selectFromResult: ({ data, isError, isFetching, ...rest }) => ({
			data: data && {
				body: data.body,
				industryId: data.industryId,
				industryName: data.industryName,
				language: data.language,
				name: data.name,
				type: data.type,
			},
			isFetching,
			showError: !isFetching && !!isError && !data,
			...rest,
		}),
		skip: !templateId,
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if (showError) return <DisplayError error={error as any} showReloadButton />

	// Adding `!` becasue TS comiler comlains that data may be undefined, but its alread handle above, hence its never so
	return <SmsPrebuiltTemplateView {...data!} />
}

export default SmsPrebuiltTemplateRoute
