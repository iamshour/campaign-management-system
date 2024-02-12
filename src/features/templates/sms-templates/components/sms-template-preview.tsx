//#region Import
import { SmsTemplateType, SmsPrebuiltTemplateType } from "../types"

import MobileSmsPreview from "./mobile-sms-preview"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

type TemplateType =
	| Pick<SmsTemplateType, "name" | "type" | "language" | "body">
	| Pick<SmsPrebuiltTemplateType, "name" | "type" | "language" | "body" | "industryId">

function SmsTemplatePreview<T extends TemplateType>(smsTemplate: T) {
	const { body, ...smsTemplateInfo } = smsTemplate

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>View {smsTemplate.name}</h1>
			<div className=' flex flex-1 flex-row flex-wrap justify-between rounded-xl bg-[#F7F7F7] p-6 px-12 lg:flex-nowrap'>
				<div className='ml-8 max-w-full md:max-w-[700px]'>
					<div>
						<h1 className='relative mb-5 text-xl font-bold'>
							<MdiInformationVariantCircle className='absolute -left-9 top-1 text-[#2daef5]' />
							Template Basic Info
						</h1>

						{Object.entries(smsTemplateInfo).map(([key, val]) => (
							<SmsTemplateInfoItem itemName={key} itemValue={val} />
						))}
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
}

export default SmsTemplatePreview

/**
 * Component to render sms template detail in the following format:
 * @example "Template Language: English"
 *
 * @param itemName: name of the field, to be used when displaying field label
 * @param itemValue: value of the field
 * @returns ReactNode containing formatted sms template detail
 */
const SmsTemplateInfoItem = ({ itemName, itemValue }: { itemName: string; itemValue: string }) => {
	const itemLabel = `Template ${itemName.charAt(0).toUpperCase() + itemName.slice(1)}`

	return (
		<p className='mb-2'>
			<strong className='mr-2 font-medium'>{itemLabel}:</strong>
			{itemValue}
		</p>
	)
}
