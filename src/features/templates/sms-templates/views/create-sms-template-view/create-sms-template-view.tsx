//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import { useAddNewSmsTemplateMutation } from "@/features/templates/sms-templates/api"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import type { SmsTemplateSchemaType } from "@/features/templates/sms-templates/schemas/sms-template-schema"
import type { SmsTemplateStatusOption } from "@/features/templates/sms-templates/types"
import { Button } from "@/ui"
//#endregion

interface CreateSmsTemplateViewProps {
	defaultValues?: SmsTemplateSchemaType
}

const CreateSmsTemplateView = ({ defaultValues }: CreateSmsTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const navigate = useNavigate()

	const [triggerAddNewSmsTemplate, { isLoading }] = useAddNewSmsTemplateMutation()

	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async (requestBody: SmsTemplateSchemaType) => {
		if (!requestBody || !smsTemplateStatus) return
		await triggerAddNewSmsTemplate({ ...requestBody, status: smsTemplateStatus })
			.unwrap()
			.then(() => {
				toast.success("Template added successfully")
				navigate(appPaths.SMS_TEMPLATES, { replace: true })
			})
	}

	return (
		<SmsTemplateBuilder label={t("createTemplate.title")} onSubmit={onSubmit} defaultValues={defaultValues}>
			<SmsTemplateBuilder.Body />

			<SmsTemplateBuilder.Footer>
				<Button
					variant='outline'
					type='submit'
					className='px-10'
					loading={isLoading && smsTemplateStatus == "DRAFT"}
					disabled={isLoading && smsTemplateStatus == "PUBLISHED"}
					onClick={() => SetSmsTemplateStatus("DRAFT")}>
					{t("actions.updateDraft")}
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

export default CreateSmsTemplateView
