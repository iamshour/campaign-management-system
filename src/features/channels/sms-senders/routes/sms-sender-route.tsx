//#region Import
import type { SmsChannelTypeOption } from "@/features/channels/sms-senders/types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import templateTypesOptions from "@/features/templates/common/constants/template-types-options"
import { TemplateType } from "@/features/templates/common/types"
import { FullViewSkeleton, NoResultsFound } from "@/ui"
import DisplayError from "@/ui/errors/display-error"
import { useState } from "react"
import { useParams } from "react-router-dom"

import { useGetSmsListingsQuery } from "../api"
import SmsListingsView from "../views/sms-listings-view/sms-listings-view"

//#endregion

const SmsSenderRoute = () => {
	const params = useParams()

	// channel type: "local" | "international"
	const channelType: SmsChannelTypeOption = Object.values(params)[0] as SmsChannelTypeOption

	const senderId = params.senderId

	const [typeFilter, setTypeFilter] = useState<TemplateType>(templateTypesOptions[0]?.value)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } = useGetSmsListingsQuery(
		{
			channelType,
			senderId: senderId!,
			type: typeFilter,
		},
		{
			selectFromResult: ({ data, isFetching, isLoading, isSuccess, ...rest }) => ({
				count: data?.count,
				isEmptyView: !isFetching && !!isSuccess && !data?.list?.length,
				isFetching,
				isInitialLoading: !data && isLoading,
				isReady: !isLoading && data?.list !== undefined && data?.count !== undefined,
				list: data?.list,
				...rest,
			}),
			skip: !typeFilter,
			...baseQueryConfigs,
		}
	)

	if (isInitialLoading) return <FullViewSkeleton />

	if (isEmptyView) return <NoResultsFound />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isReady)
		return (
			<SmsListingsView
				count={count || 0}
				isFetching={isFetching}
				list={list || []}
				setTypeFilter={setTypeFilter}
				typeFilter={typeFilter}
			/>
		)
}

export default SmsSenderRoute
