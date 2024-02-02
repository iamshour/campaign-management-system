//#region Import
import type { SmsTemplate } from "../types"

import MobileSmsPreview from "./mobile-sms-preview"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

interface SmsTemplatePreview {
	smsTemplate: SmsTemplate
}

const SmsTemplatePreview = ({ smsTemplate }: SmsTemplatePreview) => {
	return (
		<div className='m-6 flex h-full w-full flex-col'>
			<h1 className='mb-6 text-xl font-bold'>View {smsTemplate.name}</h1>
			<div className=' flex flex-1 flex-row justify-between rounded-xl bg-[#F7F7F7] p-6 px-12'>
				<div className='ml-8 max-w-[700px]'>
					<div>
						<h1 className='relative mb-5 text-xl font-bold'>
							<MdiInformationVariantCircle className='absolute -left-9 top-1 text-[#2daef5]' />
							Template Basic Info
						</h1>
						<p className='mb-2'>
							<strong className='mr-2 font-medium'>Template Name:</strong>
							{smsTemplate.name}
						</p>
						<p className='mb-2'>
							<strong className='mr-2 font-medium'>Template Type:</strong>
							{smsTemplate.type}
						</p>
						<p className='mb-2'>
							<strong className='mr-2 font-medium'>Template Lanugauge:</strong>
							{smsTemplate.language}
						</p>
					</div>

					<div className='mt-8'>
						<h1 className='relative mb-5 text-xl font-bold'>
							<MdiMessageProcessing className='absolute -left-9 top-1 text-[#2daef5]' />
							Message Text
						</h1>
						<p className='mb-2'>
							<strong className='font-medium'>Template Body:</strong>
						</p>
						<p>{smsTemplate.body}</p>
					</div>
				</div>

				<MobileSmsPreview message={smsTemplate.body} />
			</div>
		</div>
	)
}

export default SmsTemplatePreview
