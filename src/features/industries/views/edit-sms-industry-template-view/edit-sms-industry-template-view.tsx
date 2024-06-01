//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"

import { useUpdateSmsIndustryTemplateMutation } from "@/features/industries/api"
import SmsIndustryTemplateBuilderContent from "@/features/industries/components/sms-industry-template-builder-content/sms-industry-template-builder-content"
import SmsIndustryTemplateSchema, {
	type SmsIndustryTemplateSchemaType,
} from "@/features/industries/schemas/sms-industry-template-schema"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import { Button } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
//#endregion

interface EditSmsIndustryTemplateViewProps {
	defaultValues?: SmsIndustryTemplateSchemaType & { status?: TemplateStatus }
}

const EditSmsIndustryTemplateView = ({ defaultValues }: EditSmsIndustryTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const navigate = useNavigate()

	const { industryId, templateId } = useParams()

	const [triggerUpdateSmsIndustryTemplate, { isLoading }] = useUpdateSmsIndustryTemplateMutation()

	const [status, setStatus] = useState<TemplateStatus | undefined>()

	const onSubmit = async ({ background, ...formBody }: SmsIndustryTemplateSchemaType) => {
		if (!formBody || !industryId || !templateId || !status) return

		const body = new FormData()

		const jsonBlob = new Blob([JSON.stringify({ channel: "SMS", industryId, ...formBody, status })], {
			type: "application/json",
		})

		body.append("prebuiltTemplateRequest", jsonBlob)

		// add background image to request body
		if (background) body.append("background", background as Blob)

		await triggerUpdateSmsIndustryTemplate({ body, industryId, templateId }).unwrap()

		toast.success("Template updated successfully")
		navigate(`/industries/${industryId}/sms`, { replace: true })
	}

	return (
		<SmsTemplateBuilder
			defaultValues={defaultValues}
			label={t("editTemplate.title")}
			onSubmit={onSubmit}
			schema={SmsIndustryTemplateSchema}>
			<SmsTemplateBuilder.Body>
				<SmsIndustryTemplateBuilderContent />
			</SmsTemplateBuilder.Body>

			<SmsTemplateBuilder.Footer>
				{defaultValues?.status === "DRAFT" && (
					<Button
						className='px-10'
						disabled={isLoading && status == "PUBLISHED"}
						loading={isLoading && status == "DRAFT"}
						onClick={() => setStatus("DRAFT")}
						type='submit'
						variant='outline'>
						{t("actions.updateDraft")}
					</Button>
				)}

				<Button
					className='px-10'
					disabled={isLoading && status == "DRAFT"}
					loading={isLoading && status == "PUBLISHED"}
					onClick={() => setStatus("PUBLISHED")}
					type='submit'>
					{t("actions.updatedPublished")}
				</Button>
			</SmsTemplateBuilder.Footer>
		</SmsTemplateBuilder>
	)
}

export default EditSmsIndustryTemplateView
