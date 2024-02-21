//#region Import
import SmsTemplatePreview from "@/features/templates/sms-templates/components/sms-template-preview"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"
//#endregion

const SmsTemplateView = (data: Pick<SmsTemplateType, "name" | "type" | "language" | "body">) => {
	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>View {data?.name}</h1>
			<SmsTemplatePreview {...data} />
		</div>
	)
}

export default SmsTemplateView
