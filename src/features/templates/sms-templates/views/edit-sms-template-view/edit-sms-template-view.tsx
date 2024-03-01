//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"
import type { SmsTemplateSchemaType } from "@/features/templates/sms-templates/schemas/sms-template-schema"
import type { AddNewSmsTemplateBody } from "@/features/templates/sms-templates/types"

import appPaths from "@/core/constants/app-paths"
import { useUpdateSmsTemplateMutation } from "@/features/templates/sms-templates/api"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import { Button } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
//#endregion

interface EditSmsTemplateViewProps {
	defaultValues?: SmsTemplateSchemaType & { status?: TemplateStatus }
}

const EditSmsTemplateView = ({ defaultValues }: EditSmsTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const { templateId } = useParams()

	const navigate = useNavigate()

	const [triggerUpdateSmsTemplate, { isLoading }] = useUpdateSmsTemplateMutation()

	const [status, setStatus] = useState<TemplateStatus | undefined>()

	const onSubmit = async (requestBody: Omit<AddNewSmsTemplateBody, "status">) => {
		if (!requestBody || !templateId || !status) return

		await triggerUpdateSmsTemplate({ id: templateId, ...requestBody, status }).unwrap()

		toast.success("Template added successfully")
		navigate(appPaths.SMS_TEMPLATES, { replace: true })
	}

	return (
		<SmsTemplateBuilder defaultValues={defaultValues} label={t("editTemplate.title")} onSubmit={onSubmit}>
			<SmsTemplateBuilder.Body />

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

export default EditSmsTemplateView
