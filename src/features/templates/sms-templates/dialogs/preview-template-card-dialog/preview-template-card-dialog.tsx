//#region Import
import { lazy } from "react"

import type { SmsIndustryTemplateType } from "@/features/industries/types"
import { Dialog } from "@/ui"

const SmsPrebuiltTemplateCard = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-template-card")
)
//#endregion

interface PreviewTemplateCardDialogProps
	extends Partial<
		Pick<SmsIndustryTemplateType, "name" | "type" | "language" | "body" | "industryName" | "backgroundImage">
	> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const PreviewTemplateCardDialog = ({ children, ...smsTemplate }: PreviewTemplateCardDialogProps) => (
	<Dialog>
		<Dialog.Trigger asChild>{children}</Dialog.Trigger>
		<Dialog.Content title='Preview Card' className='h-[358px] w-[403px] sm:h-[366px] sm:w-[411px]'>
			<SmsPrebuiltTemplateCard {...smsTemplate} className='pointer-events-none cursor-auto' />
		</Dialog.Content>
	</Dialog>
)

export default PreviewTemplateCardDialog
