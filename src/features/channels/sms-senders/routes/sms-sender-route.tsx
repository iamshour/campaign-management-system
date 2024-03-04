//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { FullViewSkeleton, NoResultsFound } from "@/ui"
import DisplayError from "@/ui/errors/display-error"
import { useParams } from "react-router-dom"

import { useGetSmsSenderByIdQuery } from "../api"
import SmsListingsView from "../views/sms-listings-view/sms-listings-view"
//#endregion

const SmsSenderRoute = () => {
	const params = useParams()

	const senderId = params.senderId

	const { isError, isInitialLoading, isReady, types } = useGetSmsSenderByIdQuery(senderId!, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.types),
			name: data?.name,
			types: data?.types,
			...rest,
		}),
		skip: !senderId,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <FullViewSkeleton />

	if (isError || !types) return <DisplayError className='h-full w-full' />

	if (!types?.length) return <NoResultsFound />

	if (isReady) return <SmsListingsView types={types} />
}

export default SmsSenderRoute
