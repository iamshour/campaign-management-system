//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import { useUpdateSmsTemplateMutation } from "@/features/templates/sms-templates/api"
import SmsTemplateBuilder from "@/features/templates/sms-templates/components/sms-template-builder/sms-template-builder"
import type { SmsTemplateSchemaType } from "@/features/templates/sms-templates/schemas/sms-template-schema"
import type { AddNewSmsTemplateArgs, SmsTemplateStatusOption } from "@/features/templates/sms-templates/types"
import { Button } from "@/ui"
//#endregion

interface EditSmsTemplateViewProps {
	defaultValues?: SmsTemplateSchemaType & { status?: SmsTemplateStatusOption }
}

const EditSmsTemplateView = ({ defaultValues }: EditSmsTemplateViewProps) => {
	const { t } = useTranslation("sms-templates", { keyPrefix: "components.templateBuilder" })

	const { templateId } = useParams()
	const navigate = useNavigate()

	const [updateSmsTemplate, { isLoading }] = useUpdateSmsTemplateMutation()

	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async (requestBody: Omit<AddNewSmsTemplateArgs, "status">) => {
		if (!requestBody || !templateId || !smsTemplateStatus) return
		await updateSmsTemplate({ id: templateId, ...requestBody, status: smsTemplateStatus })
			.unwrap()
			.then(() => {
				toast.success("Template added successfully")
				navigate(appPaths.SMS_TEMPLATES, { replace: true })
			})
	}

	return (
		<SmsTemplateBuilder label={t("editTemplate.title")} onSubmit={onSubmit} defaultValues={defaultValues}>
			<SmsTemplateBuilder.Body />

			<SmsTemplateBuilder.Footer>
				{defaultValues?.status === "DRAFT" && (
					<Button
						variant='outline'
						type='submit'
						className='px-10'
						loading={isLoading && smsTemplateStatus == "DRAFT"}
						disabled={isLoading && smsTemplateStatus == "PUBLISHED"}
						onClick={() => SetSmsTemplateStatus("DRAFT")}>
						{t("actions.saveAsDraft")}
					</Button>
				)}

				<Button
					type='submit'
					className='px-10'
					loading={isLoading && smsTemplateStatus == "PUBLISHED"}
					disabled={isLoading && smsTemplateStatus == "DRAFT"}
					onClick={() => SetSmsTemplateStatus("PUBLISHED")}>
					{t("actions.publish")}
				</Button>
			</SmsTemplateBuilder.Footer>
		</SmsTemplateBuilder>
	)
}

export default EditSmsTemplateView
