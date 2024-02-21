//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { FullViewSkeleton } from "@/ui"

const SmsIndustryTemplateView = lazy(
	() => import("@/features/industries/views/sms-industry-template-view/sms-industry-template-view")
)
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsIndustryTemplateRoute = () => {
	const { templatedId } = useParams()

	const { data, isFetching, showError, error } = useGetSmsIndustryTemplateByIdQuery(templatedId!, {
		skip: !templatedId,
		selectFromResult: ({ data, isFetching, isError, ...rest }) => ({
			data: data && {
				body: data.body,
				name: data.name,
				type: data.type,
				language: data.language,
				background: data.background,
				backgroundImage: data.backgroundImage,
				industryId: data.industryId,
				industryName: data.industryName,
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
	return <SmsIndustryTemplateView {...data!} />
}

export default SmsIndustryTemplateRoute
