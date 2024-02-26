//#region Import
import type { SmsTemplateSchemaType } from "@/features/templates/sms-templates/schemas/sms-template-schema"
import type { AddNewSmsTemplateBody, SmsTemplateStatusOption } from "@/features/templates/sms-templates/types"

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
	defaultValues?: SmsTemplateSchemaType & { status?: SmsTemplateStatusOption }
}

const EditSmsTemplateView = ({ defaultValues }: EditSmsTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const { templateId } = useParams()

	const navigate = useNavigate()

	const [triggerUpdateSmsTemplate, { isLoading }] = useUpdateSmsTemplateMutation()

	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async (requestBody: Omit<AddNewSmsTemplateBody, "status">) => {
		if (!requestBody || !templateId || !smsTemplateStatus) return

		await triggerUpdateSmsTemplate({ id: templateId, ...requestBody, status: smsTemplateStatus }).unwrap()

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
						disabled={isLoading && smsTemplateStatus == "PUBLISHED"}
						loading={isLoading && smsTemplateStatus == "DRAFT"}
						onClick={() => SetSmsTemplateStatus("DRAFT")}
						type='submit'
						variant='outline'>
						{t("actions.updateDraft")}
					</Button>
				)}

				<Button
					className='px-10'
					disabled={isLoading && smsTemplateStatus == "DRAFT"}
					loading={isLoading && smsTemplateStatus == "PUBLISHED"}
					onClick={() => SetSmsTemplateStatus("PUBLISHED")}
					type='submit'>
					{t("actions.updatedPublished")}
				</Button>
			</SmsTemplateBuilder.Footer>
		</SmsTemplateBuilder>
	)
}

export default EditSmsTemplateView
