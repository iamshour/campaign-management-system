//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"
import type { SmsTemplateSchemaType } from "@/features/templates/sms-templates/schemas/sms-template-schema"

import appPaths from "@/core/constants/app-paths"
import { useAddNewSmsTemplateMutation } from "@/features/templates/sms-templates/api"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import { Button } from "@/ui"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
//#endregion

interface CreateSmsTemplateViewProps {
	defaultValues?: SmsTemplateSchemaType
}

const CreateSmsTemplateView = ({ defaultValues }: CreateSmsTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const navigate = useNavigate()

	const [triggerAddNewSmsTemplate, { isLoading }] = useAddNewSmsTemplateMutation()

	const [status, setStatus] = useState<TemplateStatus | undefined>()

	const onSubmit = async (requestBody: SmsTemplateSchemaType) => {
		if (!requestBody || !status) return

		await triggerAddNewSmsTemplate({ ...requestBody, status }).unwrap()

		toast.success("Template added successfully")
		navigate(appPaths.SMS_TEMPLATES, { replace: true })
	}

	return (
		<SmsTemplateBuilder defaultValues={defaultValues} label={t("createTemplate.title")} onSubmit={onSubmit}>
			<SmsTemplateBuilder.Body />

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

export default CreateSmsTemplateView
