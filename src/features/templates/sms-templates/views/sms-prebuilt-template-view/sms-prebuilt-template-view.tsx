//#region Import
import type { SmsIndustryTemplateType } from "@/features/industries/types"

import appPaths from "@/core/constants/app-paths"
import SmsTemplatePreview from "@/features/templates/sms-templates/components/sms-template-preview"
import { Button, Footer } from "@/ui"
import { useLocation, useParams } from "react-router-dom"
//#endregion

const SmsPrebuiltTemplateView = (
	data: Pick<SmsIndustryTemplateType, "body" | "industryId" | "industryName" | "language" | "name" | "type">
) => {
	const { pathname, state } = useLocation()

	const { templateId } = useParams()

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>View {data?.name}</h1>

			<SmsTemplatePreview
				{...data}
				additionalTemplateInfo={[{ label: "Industry Name", value: data.industryName ?? "" }]}
			/>

			<Footer className='mt-5'>
				<Button
					as='link'
					className='px-10'
					to={state?.from || appPaths.SMS_TEMPLATES_PREBUILT_TEMPLATES}
					variant='outline'>
					Back
				</Button>
				<Button
					as='link'
					className='px-10'
					state={{ from: pathname }}
					to={`${appPaths.SMS_TEMPLATES_MY_TEMPLATES}/new-template?templateId=${templateId}&templateType=smsPrebuiltTemplate`}>
					Use Template
				</Button>
			</Footer>
		</div>
	)
}

export default SmsPrebuiltTemplateView
