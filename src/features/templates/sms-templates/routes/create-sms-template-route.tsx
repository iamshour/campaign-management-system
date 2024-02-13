//#region Import
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useLocation } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { Button, DisplayError, FullViewSkeleton } from "@/ui"

import { useGetSmsTemplateByIdQuery, useGetSmsPrebuiltTemplateByIdQuery, useAddNewSmsTemplateMutation } from "../api"
import SmsTemplateBuilder from "../components/sms-template-builder/sms-template-builder"
import type { AddNewSmsTemplateArgs, SmsTemplateStatusOption } from "../types"
//#endregion

const CreateSmsTemplateRoute = () => {
	const navigate = useNavigate()

	/** Fetch SMS Template Data in case of Clone template and Use prebuilt template: */
	const { search } = useLocation()
	const [smsTemplateType, smsTemplateId] = search ? search.split(/[?&]/)[1]!.split("=") : []
	const useFetchHook =
		smsTemplateType === "smsTemplate" ? useGetSmsTemplateByIdQuery : useGetSmsPrebuiltTemplateByIdQuery

	const { data, isFetching, isError, error } = useFetchHook(smsTemplateId!, {
		skip: !smsTemplateId,
		...baseQueryConfigs,
		selectFromResult: ({ data, ...rest }) => ({
			data: data && {
				name: data.name,
				type: data.type,
				language: data.language,
				status: data.status,
				body: data?.body,
				addUnsubscribeLink: Math.random() < 0.5, // TODO: set actual value when support is added on Backend, currently generating random boolean
			},
			...rest,
		}),
	})

	/** Create Template: */

	const [addSmsTemplate, { isLoading }] = useAddNewSmsTemplateMutation()

	const [smsTemplateStatus, SetSmsTemplateStatus] = useState<SmsTemplateStatusOption | undefined>()

	const onSubmit = async (requestBody: Omit<AddNewSmsTemplateArgs, "status">) => {
		if (!requestBody || !smsTemplateStatus) return
		await addSmsTemplate({ ...requestBody, status: smsTemplateStatus })
			.unwrap()
			.then(() => {
				toast.success("Template added successfully")
				navigate(appPaths.SMS_TEMPLATES, { replace: true })
			})
	}

	/** Display Sms Template Form */

	if (!!smsTemplateId && isFetching) return <FullViewSkeleton />

	if (!!smsTemplateId && ((!isFetching && isError) || !data)) return <DisplayError error={error as any} />

	return (
		<SmsTemplateBuilder onSubmit={onSubmit} defaultValue={data}>
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
				Save & Publish Template
			</Button>
		</SmsTemplateBuilder>
	)
}

export default CreateSmsTemplateRoute
