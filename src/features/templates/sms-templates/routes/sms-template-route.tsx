//#region Import
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { DisplayError, FullViewSkeleton } from "@/ui"

import { useGetSmsTemplateByIdQuery } from "../api"
import SmsTemplatePreview from "../components/sms-template-preview"
//#endregion

const SmsTemplateRoute = () => {
	const { id: mySmsTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsTemplateByIdQuery(mySmsTemplateId!, {
		skip: !mySmsTemplateId,
		...baseQueryConfigs,
	})

	if (isFetching) return <FullViewSkeleton />

	if ((!isFetching && isError) || !data) return <DisplayError error={error as any} />

	return <SmsTemplatePreview {...data} />
}

export default SmsTemplateRoute
