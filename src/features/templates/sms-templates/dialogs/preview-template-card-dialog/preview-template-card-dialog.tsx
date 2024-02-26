//#region Import
import type { SmsIndustryTemplateType } from "@/features/industries/types"

import { Dialog } from "@/ui"
import { lazy } from "react"

const SmsPrebuiltTemplateCard = lazy(
	() => import("@/features/templates/sms-templates/views/sms-prebuilt-templates-view/sms-prebuilt-template-card")
)
//#endregion

interface PreviewTemplateCardDialogProps
	extends Partial<
		Pick<SmsIndustryTemplateType, "backgroundImage" | "body" | "industryName" | "language" | "name" | "type">
	> {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const PreviewTemplateCardDialog = ({ children, ...smsTemplate }: PreviewTemplateCardDialogProps) => (
	<Dialog>
		<Dialog.Trigger asChild>{children}</Dialog.Trigger>
		<Dialog.Content className='h-[358px] w-[403px] sm:h-[366px] sm:w-[411px]' title='Preview Card'>
			<SmsPrebuiltTemplateCard {...smsTemplate} className='pointer-events-none cursor-auto' />
		</Dialog.Content>
	</Dialog>
)

export default PreviewTemplateCardDialog
