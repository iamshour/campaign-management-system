//#region Import
import type { SmsIndustryTemplateSchemaType } from "@/features/industries/schemas/sms-industry-template-schema"

import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import PreviewTemplateCardDialog from "@/features/templates/sms-templates/dialogs/preview-template-card-dialog/preview-template-card-dialog"
import { Button, Checkbox, Form, Separator, Skeleton } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MaterialSymbolsImagesmodeOutline from "~icons/material-symbols/imagesmode-outline"
import { lazy, Suspense, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const BuilderPreviewBackgroundSection = lazy(() => import("./builder-preview-background-section"))

const BuilderDropareaSection = lazy(() => import("./builder-droparea-section"))
//#endregion

const SmsIndustryTemplateBuilderContent = () => {
	const { t } = useTranslation("industries", { keyPrefix: "components.smsTemplateBuilder.backgroundField" })

	const { control, watch } = useFormContext<SmsIndustryTemplateSchemaType>()

	const smsTemplate = watch()

	const { backgroundImage } = smsTemplate

	const previewCardBackground = useMemo(
		() =>
			backgroundImage
				? `data:image;base64,${backgroundImage}`
				: smsTemplate?.background
					? URL.createObjectURL(smsTemplate.background)
					: undefined,
		[backgroundImage, smsTemplate?.background]
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
				description={t("sectionHeading.description")}
				icon={MaterialSymbolsImagesmodeOutline}
				label={t("sectionHeading.label")}
			/>

			<div className='h-[175px] w-full max-w-[490px]'>
				<Suspense fallback={<Skeleton />}>
					{backgroundImage ? (
						<BuilderPreviewBackgroundSection src={`data:image;base64,${backgroundImage}`} />
					) : (
						<BuilderDropareaSection />
					)}
				</Suspense>

				<PreviewTemplateCardDialog
					backgroundImage={previewCardBackground}
					body={smsTemplate?.body}
					industryName={""}
					language={smsTemplate?.language}
					name={smsTemplate?.name}
					type={smsTemplate?.type}>
					<Button className='p-0' type='button' variant='link'>
						Preview Card
						<IconTooltip content={t("dropArea.previewCardIconTooltipContent")} />
					</Button>
				</PreviewTemplateCardDialog>
			</div>
		</>
	)
}

export default SmsIndustryTemplateBuilderContent
