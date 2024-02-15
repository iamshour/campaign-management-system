//#region Import
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import IconTooltip from "@/core/components/icon-tooltip/icon-tooltip"
import imageMimeTypes from "@/core/constants/image-mime-types"
import type { SmsIndustryTemplateSchemaType } from "@/features/industries/schemas/sms-industry-template-schema"
import { DropFileArea, Form } from "@/ui"
//#endregion

/**
 * Max Image size is 500kb
 */
const MAXSIZE = 512000

const BuilderDropareaSection = () => {
	const { t } = useTranslation("industries", { keyPrefix: "components.templateBuilder.backgroundField" })

	const { control } = useFormContext<SmsIndustryTemplateSchemaType>()

	return (
		<Form.Field
			control={control}
			name='background'
			render={({ field: { onChange, value } }) => (
				<Form.Item className='flex h-full w-full flex-col'>
					<Form.Label className='inline-flex items-center gap-1'>
						<span>{t("dropArea.label")} *</span>
						<IconTooltip content={t("dropArea.labelIconTooltipContent")} />
					</Form.Label>
					<Form.Control>
						<DropFileArea
							name='background'
							acceptedFiles={value ? [value] : []}
							onRemove={() => onChange(undefined)}
							accept={imageMimeTypes}
							onDropRejected={(fileRejections) => {
								fileRejections[0].errors.forEach(({ code }) => toast.error(t(`dropArea.errors.${code}`)))
							}}
							disabled={!!value?.name?.length}
							onDrop={(acceptedFiles) => onChange(acceptedFiles[0])}
							preventDropOnDocument
							maxSize={MAXSIZE}
							maxFiles={1}
							multiple={false}
							classNames={{
								wrapper: "w-full flex-1 !p-0 [&_img]:!max-h-[60px] [&_img]:!max-w-[60px]",
								droparea: "flex-row",
							}}
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
