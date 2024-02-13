//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { FullViewSkeleton } from "@/ui"

import { useGetSmsPrebuiltTemplateByIdQuery } from "../api"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsTemplatePreview = lazy(() => import("../components/sms-template-preview"))
//#endregion

const SmsPrebuiltTemplateRoute = () => {
	const { id: smsPrebuiltTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsPrebuiltTemplateByIdQuery(smsPrebuiltTemplateId!, {
		skip: !smsPrebuiltTemplateId,
		selectFromResult: ({ data, ...rest }) => ({
			data: data && {
				// addUnsubscribeLink: data?.addUnsubscribeLink,  // TODO: enable when supported on backend
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

	return <SmsTemplatePreview {...data} />
}

export default SmsPrebuiltTemplateRoute
