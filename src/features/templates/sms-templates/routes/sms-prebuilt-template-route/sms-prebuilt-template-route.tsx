//#region Import
import { lazy } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsIndustryTemplateByIdQuery } from "@/features/industries/api"
import { Button, FullViewSkeleton } from "@/ui"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
const SmsTemplatePreview = lazy(() => import("@/features/templates/sms-templates/components/sms-template-preview"))
//#endregion

const SmsPrebuiltTemplateRoute = () => {
	const { id: smsPrebuiltTemplateId } = useParams()
	const { state } = useLocation()
	const navigate = useNavigate()

	const { data, isFetching, isError, error } = useGetSmsIndustryTemplateByIdQuery(smsPrebuiltTemplateId!, {
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

	return (
		<SmsTemplatePreview {...data} additionalTemplateInfo={[{ label: "IndustryId", value: data.industryId }]}>
			<div className='mt-5 flex flex-row justify-end space-x-4'>
				<Button
					variant='outline'
					className='px-10'
					onClick={() => navigate(state?.from || appPaths.SMS_TEMPLATES_PREBUILT_TEMPLATES)}>
					Back
				</Button>
				<Button
					className='px-10'
					onClick={() =>
						navigate(
							`${appPaths.SMS_TEMPLATES_MY_TEMPLATES}/new-template?templateId=${smsPrebuiltTemplateId}&templateType=smsPrebuiltTemplate`
						)
					}>
					Use Template
				</Button>
			</div>
		</SmsTemplatePreview>
	)
}

export default SmsPrebuiltTemplateRoute
