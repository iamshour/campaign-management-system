//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { useGetSmsTemplateByIdQuery } from "@/features/templates/sms-templates/api"
import { FullViewSkeleton } from "@/ui"
import incrementNumberSuffix from "@/utils/increment-number-suffix"
import { lazy } from "react"
import { useSearchParams } from "react-router-dom"

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

	const { defaultValues, error, isError, isFetching } = useFetchHook(templateId!, {
		selectFromResult: ({ data, ...rest }) => ({
			defaultValues: data && {
				body: data?.body,
				language: data.language,
				name: templateType !== "smsPrebuiltTemplate" ? incrementNumberSuffix(data.name) : data.name,
				status: data.status,
				type: data.type,
			},
			...rest,
		}),
		skip: !templateId,
		...baseQueryConfigs,
	})

	if (!!templateId && isFetching) return <FullViewSkeleton />

	if (!!templateId && ((!isFetching && isError) || !defaultValues)) return <DisplayError error={error as any} />

	return <CreateSmsTemplateView defaultValues={defaultValues} />
}

export default CreateSmsTemplateRoute
