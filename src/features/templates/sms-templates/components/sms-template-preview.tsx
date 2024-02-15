//#region Import
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import { Button } from "@/ui"

import PreviewTemplateCardDialog from "../dialogs/preview-template-card-dialog/preview-template-card-dialog"

import MobileSmsPreview from "./mobile-sms-preview"

import MaterialSymbolsImagesmodeRounded from "~icons/material-symbols/imagesmode-rounded"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

type SmsTemplatePreviewProps = Pick<SmsIndustryTemplateType, "name" | "type" | "language" | "body"> &
	Partial<Pick<SmsIndustryTemplateType, "background" | "industryId">> & {
		/**
		 * Page footer to be passed as child
		 */
		children?: React.ReactNode

		/**
		 * Additional info to be displayed under "Template Basic Info" section
		 */
		additionalTemplateInfo?: { label: string; value: string }[]
	}

function SmsTemplatePreview({ children, additionalTemplateInfo, ...smsTemplate }: SmsTemplatePreviewProps) {
	const { name, type, language, body, background } = smsTemplate

	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>View {name}</h1>
			<div className=' flex flex-1 flex-row flex-wrap justify-between rounded-xl bg-[#F7F7F7] p-6 px-12 lg:flex-nowrap'>
				<div className='ml-8 max-w-full md:max-w-[700px]'>
					<div>
						<h1 className='relative mb-5 text-xl font-bold'>
							<MdiInformationVariantCircle className='absolute -left-9 top-1 text-[#2daef5]' />
							Template Basic Info
						</h1>

						<SmsTemplateInfoItem itemName='name' itemValue={name} />
						<SmsTemplateInfoItem itemName='type' itemValue={type} />
						<SmsTemplateInfoItem itemName='language' itemValue={language} />
						{additionalTemplateInfo?.map(({ label, value }) => (
							<SmsTemplateInfoItem key={label} itemName={label} itemValue={value} />
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

					{background && (
						<div className='mt-8'>
							<h1 className='relative mb-5 text-xl font-bold'>
								<MaterialSymbolsImagesmodeRounded className='absolute -left-9 top-1 h-[28px] w-[28px] text-[#2daef5]' />
								Template Background
							</h1>
							<img
								src={background}
								alt='backgroung image'
								className='h-[200px] w-[377px] rounded-lg border border-[#054060] object-cover'
							/>

							<PreviewTemplateCardDialog {...(smsTemplate as Omit<SmsIndustryTemplateType, "id">)}>
								<Button variant='link' type='button' className='p-0'>
									Preview Card
								</Button>
							</PreviewTemplateCardDialog>
						</div>
					)}
				</div>

				<MobileSmsPreview message={body} />
			</div>
			{children}
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
