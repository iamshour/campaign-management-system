//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { useAddNewSmsIndustryTemplateMutation } from "@/features/industries/api"
import SmsIndustryTemplateBuilderContent from "@/features/industries/components/sms-industry-template-builder-content/sms-industry-template-builder-content"
import SmsIndustryTemplateSchema, {
	type SmsIndustryTemplateSchemaType,
} from "@/features/industries/schemas/sms-industry-template-schema"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import type { SmsTemplateStatusOption } from "@/features/templates/sms-templates/types"
import { Button } from "@/ui"
//#endregion

interface CreateSmsIndustryTemplateViewProps {
	defaultValues?: SmsIndustryTemplateSchemaType
}

const CreateSmsIndustryTemplateView = ({ defaultValues }: CreateSmsIndustryTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const navigate = useNavigate()
	const { industryId } = useParams()

	const [triggerAddSmsIndustryTemplate, { isLoading }] = useAddNewSmsIndustryTemplateMutation()

	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async ({ background, backgroundUrl, ...requestBody }: SmsIndustryTemplateSchemaType) => {
		if (!requestBody || !smsTemplateStatus) return

		const body: Omit<SmsIndustryTemplateType, "id" | "createdAt" | "updatedAt"> = {
			...requestBody,
			channel: "SMS",
			industryId: industryId!,
			status: smsTemplateStatus,
			background: backgroundUrl ?? "",
		}

		const formData = new FormData()

		// add template info to request body
		const jsonBlob = new Blob([JSON.stringify(body)], {
			type: "application/json",
		})
		formData.append("prebuiltTemplateRequest", jsonBlob)

		// add background image to request body
		if (background) formData.append("background", background as Blob)

		await triggerAddSmsIndustryTemplate({ industryId: industryId!, body: formData })
			.unwrap()
			.then(() => {
				toast.success("Template added successfully to the industry.")
				navigate(`/industries/${industryId}`, { replace: true })
			})
	}

	return (
		<SmsTemplateBuilder
			label={t("createTemplate.title")}
			onSubmit={onSubmit}
			defaultValues={defaultValues}
			schema={SmsIndustryTemplateSchema}>
			<SmsTemplateBuilder.Body>
				<SmsIndustryTemplateBuilderContent />
			</SmsTemplateBuilder.Body>

			<SmsTemplateBuilder.Footer>
				<Button
					variant='outline'
					type='submit'
					className='px-10'
					loading={isLoading && smsTemplateStatus == "DRAFT"}
					disabled={isLoading && smsTemplateStatus == "PUBLISHED"}
					onClick={() => SetSmsTemplateStatus("DRAFT")}>
					{t("actions.saveAsDraft")}
				</Button>

				<Button
					type='submit'
					className='px-10'
					loading={isLoading && smsTemplateStatus == "PUBLISHED"}
					disabled={isLoading && smsTemplateStatus == "DRAFT"}
					onClick={() => SetSmsTemplateStatus("PUBLISHED")}>
					{t("actions.saveAndPublish")}
				</Button>
			</SmsTemplateBuilder.Footer>
		</SmsTemplateBuilder>
	)
}

export default CreateSmsIndustryTemplateView
