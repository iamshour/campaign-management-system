//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const SmsTemplateView = lazy(
	() => import("@/features/templates/sms-templates/views/sms-template-view/sms-template-view")
)
//#endregion

const SmsTemplateRoute = () => {
	const { templateId } = useParams()

	const { data, error, isFetching, showError } = useGetSmsTemplateByIdQuery(templateId!, {
		selectFromResult: ({ data, isError, isFetching, ...rest }) => ({
			data: data && {
				body: data.body,
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
	return <SmsTemplateView {...data!} />
}

export default SmsTemplateRoute
