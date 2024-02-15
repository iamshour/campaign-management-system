//#region Import
import { lazy } from "react"
import { useSearchParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { useGetSmsTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const CreateSmsTemplateView = lazy(
	() => import("@/features/templates/sms-templates/views/create-sms-template-view/create-sms-template-view")
)
//#endregion

const CreateSmsTemplateRoute = () => {
	/** Fetch SMS Template Data in case of Clone template and Use prebuilt template: */
	const [searchParams] = useSearchParams()
	const templateType = searchParams.get("templateType")
	const templateId = searchParams.get("templateId")

	const useFetchHook =
		templateType === "smsPrebuiltTemplate" ? useGetSmsIndustryTemplateByIdQuery : useGetSmsTemplateByIdQuery

	const { defaultValues, isFetching, isError, error } = useFetchHook(templateId!, {
		skip: !templateId,
		...baseQueryConfigs,
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				name: data.name,
				type: data.type,
				language: data.language,
				status: data.status,
				body: data?.body,
				// TODO: set actual value when support is added on Backend, currently generating random boolean
				addUnsubscribeLink: Math.random() < 0.5,
			},
			...rest,
		}),
	})

	if (!!templateId && isFetching) return <FullViewSkeleton />

	if (!!templateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <CreateSmsTemplateView defaultValues={defaultValues} />
}

export default CreateSmsTemplateRoute
