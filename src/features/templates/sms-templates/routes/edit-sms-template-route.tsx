//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"
import { lazy } from "react"
import { useParams } from "react-router-dom"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))

const EditSmsTemplateView = lazy(
	() => import("@/features/templates/sms-templates/views/edit-sms-template-view/edit-sms-template-view")
)
//#endregion

const CreateSmsTemplateRoute = () => {
	const { templateId } = useParams()

	const { defaultValues, error, isError, isFetching } = useGetSmsTemplateByIdQuery(templateId!, {
		skip: !templateId,
		...baseQueryConfigs,
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				body: data.body,
				language: data.language,
				name: data.name,
				status: data.status,
				type: data.type,
			},
			...rest,
		}),
	})

	if (!!templateId && isFetching) return <FullViewSkeleton />

	if (!!templateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <EditSmsTemplateView defaultValues={defaultValues} />
}

export default CreateSmsTemplateRoute
