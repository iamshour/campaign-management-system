//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import { useUpdateSmsIndustryTemplateMutation } from "@/features/industries/api"
import SmsIndustryTemplateBuilderContent from "@/features/industries/components/sms-industry-template-builder-content/sms-industry-template-builder-content"
import SmsIndustryTemplateSchema, {
	type SmsIndustryTemplateSchemaType,
} from "@/features/industries/schemas/sms-industry-template-schema"
import type { UpdateSmsIndustryTemplateBody } from "@/features/industries/types"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import type { SmsTemplateStatusOption } from "@/features/templates/sms-templates/types"
import { Button } from "@/ui"
//#endregion

interface EditSmsIndustryTemplateViewProps {
	defaultValues?: SmsIndustryTemplateSchemaType & { status?: SmsTemplateStatusOption }
}

const EditSmsIndustryTemplateView = ({ defaultValues }: EditSmsIndustryTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const navigate = useNavigate()
	const { industryId, templateId } = useParams()

	const [triggerUpdateSmsIndustryTemplate, { isLoading }] = useUpdateSmsIndustryTemplateMutation()

	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async ({ background, ...requestBody }: SmsIndustryTemplateSchemaType) => {
		if (!requestBody || !smsTemplateStatus) return

		const body: UpdateSmsIndustryTemplateBody = {
			channel: "SMS",
			industryId: industryId ?? "",
			...requestBody,
			status: smsTemplateStatus,
		}

		const formData = new FormData()

		// add template info to request body
		const jsonBlob = new Blob([JSON.stringify(body)], {
			type: "application/json",
		})
		formData.append("prebuiltTemplateRequest", jsonBlob)

		// add background image to request body
		if (background) formData.append("background", background as Blob)

		await triggerUpdateSmsIndustryTemplate({ industryId: industryId!, templateId: templateId!, body: formData })
			.unwrap()
			.then(() => {
				toast.success("Template updated successfully")
				navigate(`/industries/${industryId}/sms`, { replace: true })
			})
	}

	return (
		<SmsTemplateBuilder
			label={t("editTemplate.title")}
			onSubmit={onSubmit}
			defaultValues={defaultValues}
			schema={SmsIndustryTemplateSchema}>
			<SmsTemplateBuilder.Body>
				<SmsIndustryTemplateBuilderContent />
			</SmsTemplateBuilder.Body>

			<SmsTemplateBuilder.Footer>
				{defaultValues?.status === "DRAFT" && (
					<Button
						variant='outline'
						type='submit'
						className='px-10'
						loading={isLoading && smsTemplateStatus == "DRAFT"}
						disabled={isLoading && smsTemplateStatus == "PUBLISHED"}
						onClick={() => SetSmsTemplateStatus("DRAFT")}>
						{t("actions.updateDraft")}
					</Button>
				)}

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

export default EditSmsIndustryTemplateView
