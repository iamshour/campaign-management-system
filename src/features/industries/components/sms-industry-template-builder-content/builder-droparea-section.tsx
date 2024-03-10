//#region Import
import type { SmsIndustryTemplateSchemaType } from "@/features/industries/schemas/sms-industry-template-schema"

import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import imageMimeTypes from "@/core/constants/image-mime-types"
import { DropFileArea, Form } from "@/ui"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

/**
 * Max Image size is 500kb
 */
const MAXSIZE = 512000

const BuilderDropareaSection = () => {
	const { t } = useTranslation("industries", { keyPrefix: "components.smsTemplateBuilder.backgroundField" })

	const { control } = useFormContext<SmsIndustryTemplateSchemaType>()

	return (
		<Form.Field
			control={control}
			name='background'
			render={({ field: { onChange, value } }) => (
				<Form.Item className='flex h-full w-full flex-col'>
					<Form.Label className='inline-flex items-center gap-1 [&_svg]:text-primary-600'>
						<span>{t("dropArea.label")} *</span>
						<IconTooltip content={t("dropArea.labelIconTooltipContent")} />
					</Form.Label>
					<Form.Control>
						<DropFileArea
							accept={imageMimeTypes}
							acceptedFiles={value ? [value] : []}
							classNames={{
								droparea: "flex-row",
								wrapper: "w-full flex-1 !p-0 [&_img]:!max-h-[60px] [&_img]:!max-w-[60px]",
							}}
							disabled={!!value?.name?.length}
							maxFiles={1}
							maxSize={MAXSIZE}
							multiple={false}
							name='background'
							onDrop={(acceptedFiles) => onChange(acceptedFiles[0])}
							onDropRejected={(fileRejections) => {
								fileRejections[0].errors.forEach(({ code }) => toast.error(t(`dropArea.errors.${code}`)))
							}}
							onRemove={() => onChange(undefined)}
							preventDropOnDocument
							preview='image'
						/>
					</Form.Control>
					<span className='inline-flex w-full items-center justify-between pt-2'>
						<Form.Message />

						<p className='ms-auto block text-xs text-gray-400'>{t("dropArea.validationMessage")}</p>
					</span>
				</Form.Item>
			)}
		/>
	)
}

export default BuilderDropareaSection
