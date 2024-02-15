//#region Import
import { lazy } from "react"
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const EditSmsTemplateView = lazy(
	() => import("@/features/templates/sms-templates/views/edit-sms-template-view/edit-sms-template-view")
)
//#endregion

const CreateSmsTemplateRoute = () => {
	const { id: smsTemplateId } = useParams()

	const { defaultValues, isFetching, isError, error } = useGetSmsTemplateByIdQuery(smsTemplateId!, {
		skip: !smsTemplateId,
		...baseQueryConfigs,
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				name: data.name,
				type: data.type,
				language: data.language,
				status: data.status,

				// TODO: properties to be replaced by "body" (+remove following ignore comments):
				// eslint-disable-next-line
				// @ts-expect-error
				body: data?.properties?.smsContent,
				// body: data.body,
			},
			...rest,
		}),
	})

	if (!!smsTemplateId && isFetching) return <FullViewSkeleton />

	if (!!smsTemplateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <EditSmsTemplateView defaultValues={defaultValues} />
}

export default CreateSmsTemplateRoute
