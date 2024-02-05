//#region Import
import { useParams } from "react-router-dom"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { DisplayError, Skeleton } from "@/ui"

import { useGetSmsTemplateByIdQuery } from "../api"
import SmsTemplatePreview from "../components/sms-template-preview"
//#endregion

const MySmsTemplateRoute = () => {
	const { id: mySmsTemplateId } = useParams()

	const { data, isFetching, isError, error } = useGetSmsTemplateByIdQuery(mySmsTemplateId!, {
		skip: !mySmsTemplateId,
		...baseQueryConfigs,
	})

	if (isFetching) return <Skeleton className='h-full' />

	if (!isFetching && isError) return <DisplayError error={error as any} />

	return <SmsTemplatePreview smsTemplate={data!} />
}

export default MySmsTemplateRoute
