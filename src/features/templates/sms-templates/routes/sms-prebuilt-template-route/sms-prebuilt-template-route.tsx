//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsPrebuiltTemplateView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-template-view/sms-prebuilt-template-view")
)
//#endregion

const SmsPrebuiltTemplateRoute = () => {
	const { templateId } = useParams()

	const { data, isFetching, showError, error } = useGetSmsIndustryTemplateByIdQuery(templateId!, {
		skip: !templateId,
		selectFromResult: ({ data, isFetching, isError, ...rest }) => ({
			data: data && {
				body: data.body,
				name: data.name,
				type: data.type,
				language: data.language,
				industryId: data.industryId,
			},
			showError: !isFetching && !!isError && !data,
			isFetching,
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if (showError) return <DisplayError error={error as any} showReloadButton />

	// Adding `!` becasue TS comiler comlains that data may be undefined, but its alread handle above, hence its never so
	return <SmsPrebuiltTemplateView {...data!} />
}

export default SmsPrebuiltTemplateRoute
