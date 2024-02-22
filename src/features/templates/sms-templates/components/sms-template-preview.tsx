//#region Import
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"
import SectionHeading from "@/ui/section-heading/section-heading"

import { smsTemplateLanguagesLocaleMap } from "../constants/sms-template-languages-options"
import { smsTemplateTypesLocaleMap } from "../constants/sms-template-types-options"

import MobileSmsPreview from "./mobile-sms-preview"

import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"
//#endregion

type SmsTemplatePreviewProps = Pick<SmsTemplateType, "name" | "type" | "language" | "body"> & {
	/**
	 * Additional Nodes to be added (Ex. Background when using this component to preview prebuilt templates)
	 */
	children?: React.ReactNode

	/**
	 * Additional info to be displayed under "Template Basic Info" section
	 */
	additionalTemplateInfo?: { label: string; value: string }[]
}

function SmsTemplatePreview({ children, additionalTemplateInfo, ...smsTemplate }: SmsTemplatePreviewProps) {
	const { name, type, language, body } = smsTemplate

	return (
		<div className=' flex flex-1 flex-row flex-wrap justify-between rounded-xl bg-[#F7F7F7] p-6 px-12 lg:flex-nowrap'>
			<div className='ms-8 max-w-full space-y-8 md:max-w-[700px]'>
				<div>
					<SectionHeading
						icon={MdiInformationVariantCircle}
						label='Template Basic Info'
						className='relative -start-10 mb-4'
					/>

					<SmsTemplateInfoItem itemName='name' itemValue={name} />
					<SmsTemplateInfoItem itemName='type' itemValue={smsTemplateTypesLocaleMap[type]} />
					<SmsTemplateInfoItem itemName='language' itemValue={smsTemplateLanguagesLocaleMap[language]} />
					{additionalTemplateInfo?.map(({ label, value }) => (
						<SmsTemplateInfoItem key={label} itemName={label} itemValue={value} />
					))}
				</div>

				<div>
					<SectionHeading icon={MdiMessageProcessing} label='Message Text' className='relative -start-10 mb-4' />

					<p className='mb-2'>
						<strong className='block pb-2 font-medium'>Template Body:</strong>
						{body}
					</p>
				</div>

				{children}
			</div>

			<MobileSmsPreview message={body} />
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
