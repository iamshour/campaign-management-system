//#region Import
import type { AddNewSmsIndustryTemplateBody } from "@/features/industries/types"
import type { SmsTemplateStatusOption } from "@/features/templates/sms-templates/types"

import { useAddNewSmsIndustryTemplateMutation } from "@/features/industries/api"
import SmsIndustryTemplateBuilderContent from "@/features/industries/components/sms-industry-template-builder-content/sms-industry-template-builder-content"
import SmsIndustryTemplateSchema, {
	type SmsIndustryTemplateSchemaType,
} from "@/features/industries/schemas/sms-industry-template-schema"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import { Button } from "@/ui"
import { convertBase64ToPng } from "@/utils"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
//#endregion

interface CreateSmsIndustryTemplateViewProps {
	/**
	 * To be passed in case of cloning a prebuilt template.
	 * Default prebuilt template body.
	 * This object will be passed to react hook form as default form values
	 */
	defaultValues?: SmsIndustryTemplateSchemaType
}

const CreateSmsIndustryTemplateView = ({ defaultValues }: CreateSmsIndustryTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const navigate = useNavigate()

	const { industryId } = useParams()

	const [triggerAddSmsIndustryTemplate, { isLoading }] = useAddNewSmsIndustryTemplateMutation()

	const [status, setStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async ({ background, backgroundImage, ...requestBody }: SmsIndustryTemplateSchemaType) => {
		if (!requestBody || !status || !industryId) return

		const body: AddNewSmsIndustryTemplateBody = {
			...requestBody,
			channel: "SMS",
			industryId: industryId!,
			status,
		}

		const formData = new FormData()

		// add template info to request body
		const jsonBlob = new Blob([JSON.stringify(body)], { type: "application/json" })

		formData.append("prebuiltTemplateRequest", jsonBlob)

		if (background) {
			formData.append("background", background)
		} else if (backgroundImage?.length) {
			const convertedBackground = convertBase64ToPng(backgroundImage)

			formData.append("background", convertedBackground, "image.png")
		}

		await triggerAddSmsIndustryTemplate({ body: formData, industryId }).unwrap()

		toast.success("Template added successfully to the industry.")
		navigate(`/industries/${industryId}/sms`, { replace: true })
	}

	return (
		<SmsTemplateBuilder
			defaultValues={defaultValues}
			label={t("createTemplate.title")}
			onSubmit={onSubmit}
			schema={SmsIndustryTemplateSchema}>
			<SmsTemplateBuilder.Body>
				<SmsIndustryTemplateBuilderContent />
			</SmsTemplateBuilder.Body>

			<SmsTemplateBuilder.Footer>
				<Button
					className='px-10'
					disabled={isLoading && status == "PUBLISHED"}
					loading={isLoading && status == "DRAFT"}
					onClick={() => setStatus("DRAFT")}
					type='submit'
					variant='outline'>
					{t("actions.saveAsDraft")}
				</Button>

				<Button
					className='px-10'
					disabled={isLoading && status == "DRAFT"}
					loading={isLoading && status == "PUBLISHED"}
					onClick={() => setStatus("PUBLISHED")}
					type='submit'>
					{t("actions.saveAndPublish")}
				</Button>
			</SmsTemplateBuilder.Footer>
		</SmsTemplateBuilder>
	)
}

export default CreateSmsIndustryTemplateView
