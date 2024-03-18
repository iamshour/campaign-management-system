//#region Import
import type { SmsIndustryTemplateSchemaType } from "@/features/industries/schemas/sms-industry-template-schema"

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
				<Form.Item className='max-w-full' label={t("dropArea.label")} required>
					<div className='relative'>
						<DropFileArea
							accept={imageMimeTypes}
							acceptedFiles={value ? [value] : []}
							classNames={{
								droparea: "sm:flex-row h-[100px]",
								fileCard: value ? "max-w-full" : "",
								fileCardWrapper: value ? "p-0 mt-0 w-full" : "",
								wrapper: value ? "w-full flex-1 border-0 !transition-none" : "w-full flex-1 !transition-none",
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
						<p className='absolute -bottom-5 end-2 ms-auto text-xs text-gray-400'>{t("dropArea.validationMessage")}</p>
					</div>
				</Form.Item>
			)}
		/>
	)
}

export default BuilderDropareaSection
