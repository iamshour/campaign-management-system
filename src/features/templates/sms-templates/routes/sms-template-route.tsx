//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { FullViewSkeleton } from "@/ui"

import { useGetSmsTemplateByIdQuery } from "../api"

const DisplayError = lazy(() => import("@/ui").then(({ DisplayError }) => ({ default: DisplayError })))
const SmsTemplatePreview = lazy(() => import("../components/sms-template-preview"))
//#endregion

const SmsTemplateRoute = () => {
	const { id: mySmsTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsTemplateByIdQuery(mySmsTemplateId!, {
		skip: !mySmsTemplateId,
		selectFromResult: ({ data, ...rest }) => ({
			data: data && {
				// addUnsubscribeLink: data?.addUnsubscribeLink,  // TODO: enable when supported on backend
				body: data.body,
				name: data.name,
				type: data.type,
				language: data.language,
			},
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if ((!isFetching && isError) || !data) return <DisplayError error={error as any} />

	return <SmsTemplatePreview {...data} />
}

export default SmsTemplateRoute
