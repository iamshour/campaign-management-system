//#region Import
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import SectionHeading from "@/ui/section-heading/section-heading"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import MdiMessageProcessing from "~icons/mdi/message-processing"

import smsTemplateLanguagesLocaleMap from "../constants/sms-template-languages-local-map"
import smsTemplateTypesLocaleMap from "../constants/sms-template-types-local-map"
import MobileSmsPreview from "./mobile-sms-preview"
//#endregion

type SmsTemplatePreviewProps = Pick<SmsTemplateType, "body" | "language" | "name" | "type"> & {
	/**
	 * Additional info to be displayed under "Template Basic Info" section
	 */
	additionalTemplateInfo?: { label: string; value: string }[]

	/**
	 * Additional Nodes to be added (Ex. Background when using this component to preview prebuilt templates)
	 */
	children?: React.ReactNode
}

function SmsTemplatePreview({ additionalTemplateInfo, children, ...smsTemplate }: SmsTemplatePreviewProps) {
	const { body, language, name, type } = smsTemplate

	return (
		<div className=' flex flex-1 flex-row flex-wrap justify-between rounded-xl bg-[#F7F7F7] p-6 px-12 lg:flex-nowrap'>
			<div className='ms-8 max-w-full space-y-8 md:max-w-[700px]'>
				<div>
					<SectionHeading
						className='relative -start-10 mb-4'
						icon={MdiInformationVariantCircle}
						label='Template Basic Info'
					/>

					<SmsTemplateInfoItem itemName='name' itemValue={name} />
					<SmsTemplateInfoItem itemName='type' itemValue={smsTemplateTypesLocaleMap[type]} />
					<SmsTemplateInfoItem itemName='language' itemValue={smsTemplateLanguagesLocaleMap[language]} />
					{additionalTemplateInfo?.map(({ label, value }) => (
						<SmsTemplateInfoItem itemName={label} itemValue={value} key={label} />
					))}
				</div>

				<div>
					<SectionHeading className='relative -start-10 mb-4' icon={MdiMessageProcessing} label='Message Text' />

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
