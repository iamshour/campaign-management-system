//#region Import
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import SmsTemplatePreview from "@/features/templates/sms-templates/components/sms-template-preview"
import PreviewTemplateCardDialog from "@/features/templates/sms-templates/dialogs/preview-template-card-dialog/preview-template-card-dialog"
import { Button } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"

import MaterialSymbolsImagesmodeRounded from "~icons/material-symbols/imagesmode-rounded"
//#endregion

type SmsIndustryTemplateViewProps = Pick<
	SmsIndustryTemplateType,
	"name" | "type" | "language" | "body" | "background" | "industryId"
>

const SmsIndustryTemplateView = ({ background, industryId, ...smsTemplate }: SmsIndustryTemplateViewProps) => {
	return (
		<div className='flex h-full w-full flex-col overflow-y-auto p-6'>
			<h1 className='mb-6 text-xl font-bold'>View {smsTemplate?.name}</h1>
			<SmsTemplatePreview {...smsTemplate}>
				<div>
					<SectionHeading
						icon={MaterialSymbolsImagesmodeRounded}
						label='Template Background'
						className='relative -start-10 mb-4'
					/>

					{!!background?.length && (
						<img
							src={background}
							alt='backgroung image'
							className='h-[200px] w-[377px] rounded-lg border border-[#054060] object-cover'
						/>
					)}

					<PreviewTemplateCardDialog {...smsTemplate} background={background} industryId={industryId}>
						<Button variant='link' type='button' className='p-0'>
							Preview Card
						</Button>
					</PreviewTemplateCardDialog>
				</div>
			</SmsTemplatePreview>
		</div>
	)
}

export default SmsIndustryTemplateView
