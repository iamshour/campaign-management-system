//#region Import
import type { SmsTemplateType } from "../types"

import MobileSmsPreview from "./mobile-sms-preview"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

const SmsTemplatePreview = ({ name, type, language, body }: SmsTemplateType) => (
	<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
		<h1 className='mb-6 text-xl font-bold'>View {name}</h1>
		<div className=' flex flex-1 flex-row flex-wrap justify-between rounded-xl bg-[#F7F7F7] p-6 px-12 lg:flex-nowrap'>
			<div className='ml-8 max-w-[700px]'>
				<div>
					<h1 className='relative mb-5 text-xl font-bold'>
						<MdiInformationVariantCircle className='absolute -left-9 top-1 text-[#2daef5]' />
						Template Basic Info
					</h1>
					<p className='mb-2'>
						<strong className='mr-2 font-medium'>Template Name:</strong>
						{name}
					</p>
					<p className='mb-2'>
						<strong className='mr-2 font-medium'>Template Type:</strong>
						{type}
					</p>
					<p className='mb-2'>
						<strong className='mr-2 font-medium'>Template Lanugauge:</strong>
						{language}
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
					<p>{body}</p>
				</div>
			</div>

			<MobileSmsPreview message={body} />
		</div>
	</div>
)

export default SmsTemplatePreview
