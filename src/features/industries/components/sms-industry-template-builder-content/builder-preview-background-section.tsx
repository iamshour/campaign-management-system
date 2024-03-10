//#region Import
import type { SmsIndustryTemplateSchemaType } from "@/features/industries/schemas/sms-industry-template-schema"

import { Button, Tooltip } from "@/ui"
import RadixIconsCross2 from "~icons/radix-icons/cross-2"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
//#endregion

interface BuilderPreviewBackgroundSectionProps {
	src: string
}

const BuilderPreviewBackgroundSection = ({ src }: BuilderPreviewBackgroundSectionProps) => {
	const { t } = useTranslation("industries", { keyPrefix: "components.smsTemplateBuilder.backgroundField.dropArea" })

	const { setValue } = useFormContext<SmsIndustryTemplateSchemaType>()

	return (
		<div className='relative h-full w-full overflow-hidden rounded-lg border border-[#054060] flex-center'>
			<img alt='backgroung image' className='bg-cover' src={src} />
			<Tooltip content={t("actions.remove")} side='right' sideOffset={4}>
				<Button
					className='absolute end-2 top-2 h-max w-max rounded-full bg-white bg-opacity-20 p-2 hover:bg-white hover:bg-opacity-50'
					onClick={() => setValue("backgroundImage", undefined)}
					type='reset'
					variant='ghost'>
					<RadixIconsCross2 />
				</Button>
			</Tooltip>
		</div>
	)
}

export default BuilderPreviewBackgroundSection
