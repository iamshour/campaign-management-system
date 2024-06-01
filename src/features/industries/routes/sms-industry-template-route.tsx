//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const SmsIndustryTemplateView = lazy(
	() => import("@/features/industries/views/sms-industry-template-view/sms-industry-template-view")
)

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsIndustryTemplateRoute = () => {
	const { templatedId } = useParams()

	const { data, error, isFetching, showError } = useGetSmsIndustryTemplateByIdQuery(templatedId!, {
		selectFromResult: ({ data, isError, isFetching, ...rest }) => ({
			data: data && {
				background: data.background,
				backgroundImage: data.backgroundImage,
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
		skip: !templatedId,
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if (showError) return <DisplayError error={error as any} showReloadButton />

	// Adding `!` becasue TS comiler comlains that data may be undefined, but its alread handle above, hence its never so
	return <SmsIndustryTemplateView {...data!} />
}

export default SmsIndustryTemplateRoute
