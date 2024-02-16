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
	const { id: smsPrebuiltTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsIndustryTemplateByIdQuery(smsPrebuiltTemplateId!, {
		skip: !smsPrebuiltTemplateId,
		selectFromResult: ({ data, ...rest }) => ({
			data: data && {
				body: data.body,
				name: data.name,
				type: data.type,
				language: data.language,
				industryId: data.industryId,
			},
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if ((!isFetching && isError) || !data) return <DisplayError error={error as any} showReloadButton />

	return <SmsPrebuiltTemplateView {...data!} />
}

export default SmsPrebuiltTemplateRoute
