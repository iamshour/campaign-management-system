//#region Import
import { Suspense, lazy, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import type { SmsIndustryTemplateSchemaType } from "@/features/industries/schemas/sms-industry-template-schema"
import PreviewTemplateCardDialog from "@/features/templates/sms-templates/dialogs/preview-template-card-dialog/preview-template-card-dialog"
import { Button, Checkbox, Form, Separator, Skeleton, twMerge } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"

import MaterialSymbolsImagesmodeOutline from "~icons/material-symbols/imagesmode-outline"

const BuilderPreviewBackgroundSection = lazy(() => import("./builder-preview-background-section"))
const BuilderDropareaSection = lazy(() => import("./builder-droparea-section"))
//#endregion

const SmsIndustryTemplateBuilderContent = () => {
	const { t } = useTranslation("industries", { keyPrefix: "components.templateBuilder.backgroundField" })

	const { control, watch } = useFormContext<SmsIndustryTemplateSchemaType>()

	const smsTemplate = watch()

	const backgroundUrl = smsTemplate?.backgroundUrl ? `data:image/png;base64,${smsTemplate?.backgroundUrl}` : undefined

	const previewCardBackground = useMemo(
		() => backgroundUrl ?? (smsTemplate?.background ? URL.createObjectURL(smsTemplate.background) : undefined),
		[backgroundUrl, smsTemplate?.background]
	)

	return (
		<>
			<Form.Field
				control={control}
				name='mostPopular'
				render={({ field }) => (
					<Form.Item className='flex flex-row items-center space-x-2'>
						<Form.Control>
							<Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
						</Form.Control>
						<Form.Label
							className={twMerge(
								"flex cursor-pointer flex-row items-center pb-0 transition-basic hover:text-primary-900",
								!!field.value && "text-primary-900"
							)}>
							{t("mostPopularField.label")}
						</Form.Label>
						<Form.Message />
					</Form.Item>
				)}
			/>

			<Separator className='h-[2px]' />

			<SectionHeading
				icon={MaterialSymbolsImagesmodeOutline}
				label={t("sectionHeading.label")}
				description={t("sectionHeading.description")}
			/>

			<div className='h-[175px] w-full max-w-[490px]'>
				<Suspense fallback={<Skeleton />}>
					{backgroundUrl ? <BuilderPreviewBackgroundSection src={backgroundUrl} /> : <BuilderDropareaSection />}
				</Suspense>

				<PreviewTemplateCardDialog
					name={smsTemplate?.name}
					type={smsTemplate?.type}
					language={smsTemplate?.language}
					body={smsTemplate?.body}
					industryId={""}
					background={previewCardBackground}>
					<Button variant='link' type='button' className='p-0'>
						Preview Card
						<IconTooltip content={t("dropArea.previewCardIconTooltipContent")} />
					</Button>
				</PreviewTemplateCardDialog>
			</div>
		</>
	)
}

export default SmsIndustryTemplateBuilderContent
