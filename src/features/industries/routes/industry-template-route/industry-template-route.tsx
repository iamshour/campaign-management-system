//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsPrebuiltTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsTemplatePreview = lazy(() => import("@/features/templates/sms-templates/components/sms-template-preview"))
//#endregion

const IndustryTemplateRoute = () => {
	const { templatedId: prebuiltTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsPrebuiltTemplateByIdQuery(prebuiltTemplateId!, {
		skip: !prebuiltTemplateId,
		selectFromResult: ({ data, ...rest }) => ({
			data: data && {
				// addUnsubscribeLink: data?.addUnsubscribeLink,  // TODO: enable when supported on backend
				body: data.body,
				name: data.name,
				type: data.type,
				language: data.language,
				background: data.background,
				industryId: data.industryId,
			},
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if ((!isFetching && isError) || !data) return <DisplayError error={error as any} showReloadButton />

	return <SmsTemplatePreview {...data} />
}

export default IndustryTemplateRoute
