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
				body: data.body,
				// TODO: set actual value when support is added on Backend, currently generating random boolean
				addUnsubscribeLink: Math.random() < 0.5,
			},
			...rest,
		}),
	})

	if (!!smsTemplateId && isFetching) return <FullViewSkeleton />

	if (!!smsTemplateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <EditSmsTemplateView defaultValues={defaultValues} />
}

export default CreateSmsTemplateRoute
