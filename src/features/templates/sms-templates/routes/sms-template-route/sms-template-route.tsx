//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsTemplatePreview = lazy(() => import("@/features/templates/sms-templates/components/sms-template-preview"))
//#endregion

const SmsTemplateRoute = () => {
	const { id: mySmsTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsTemplateByIdQuery(mySmsTemplateId!, {
		skip: !mySmsTemplateId,
		selectFromResult: ({ data, ...rest }) => ({
			data: data && {
				body: data.body,

				// TODO: properties to be replaced by "body" (+remove following ignore comments):
				// eslint-disable-next-line
				// @ts-expect-error
				body: data.properties.smsContent,
				// body: data.body,

				name: data.name,
				type: data.type,
				language: data.language,
			},
			...rest,
		}),
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if ((!isFetching && isError) || !data) return <DisplayError error={error as any} showReloadButton />

	return <SmsTemplatePreview {...data} />
}

export default SmsTemplateRoute
