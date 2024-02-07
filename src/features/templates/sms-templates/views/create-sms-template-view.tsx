//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import { Button } from "@/ui"

import { useAddNewSmsTemplateMutation } from "../api"
import SmsTemplateBuilder from "../components/sms-template-builder/sms-template-builder"
import type { AddNewSmsTemplateArgs, SmsTemplateStatusOption } from "../types"
//#endregion

const CreateSmsTemplateView = () => {
	const navigate = useNavigate()

	const [addSmsTemplate, { isLoading }] = useAddNewSmsTemplateMutation()

	// tracking which button was clicked to set appropriate sms templae status
	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async (requestBody: Omit<AddNewSmsTemplateArgs, "status">) => {
		if (!requestBody) return

		const finalRequestBody: AddNewSmsTemplateArgs = { ...requestBody, status: smsTemplateStatus! }

		await addSmsTemplate(finalRequestBody)
			.unwrap()
			.then(() => {
				toast.success("Template added successfully")
				navigate(appPaths.SMS_TEMPLATES)
			})
	}

	return (
		<SmsTemplateBuilder onSubmit={onSubmit}>
			<Button
				variant='outline'
				type='submit'
				className='px-10'
				loading={isLoading && smsTemplateStatus == "DRAFT"}
				disabled={isLoading && smsTemplateStatus == "PUBLISHED"}
				onClick={() => SetSmsTemplateStatus("DRAFT")}>
				Save as Draft
			</Button>

			<Button
				type='submit'
				className='px-10'
				loading={isLoading && smsTemplateStatus == "PUBLISHED"}
				disabled={isLoading && smsTemplateStatus == "DRAFT"}
				onClick={() => SetSmsTemplateStatus("PUBLISHED")}>
				Publish Template
			</Button>
		</SmsTemplateBuilder>
	)
}

export default CreateSmsTemplateView
