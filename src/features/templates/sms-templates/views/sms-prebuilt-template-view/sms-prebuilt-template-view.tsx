//#region Import
import { useLocation, useNavigate, useParams } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import SmsTemplatePreview from "@/features/templates/sms-templates/components/sms-template-preview"
import { Button, Footer } from "@/ui"
//#endregion

const SmsPrebuiltTemplateView = (
	data: Pick<SmsIndustryTemplateType, "name" | "type" | "language" | "body" | "industryId">
) => {
	const { state } = useLocation()
	const { templateId } = useParams()
	const navigate = useNavigate()

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>View {data?.name}</h1>

			<SmsTemplatePreview {...data} additionalTemplateInfo={[{ label: "IndustryId", value: data.industryId ?? "" }]} />

			<Footer className='mt-5'>
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
							`${appPaths.SMS_TEMPLATES_MY_TEMPLATES}/new-template?templateId=${templateId}&templateType=smsPrebuiltTemplate`
						)
					}>
					Use Template
				</Button>
			</Footer>
		</div>
	)
}

export default SmsPrebuiltTemplateView
