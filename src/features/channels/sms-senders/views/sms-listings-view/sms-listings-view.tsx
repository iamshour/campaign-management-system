//#region Import
import type { SmsChannelTypeOption, SmsSenderType } from "@/features/channels/sms-senders/types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import SmsSenderRequestDialog from "@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog"
import templateTypesOptions from "@/features/templates/common/constants/template-types-options"
import { TemplateType } from "@/features/templates/common/types"
import { Button, FullViewSkeleton, NoResultsFound, Pagination } from "@/ui"
import DisplayError from "@/ui/errors/display-error"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import { useGetSmsListingsQuery } from "../../api"
import SmsListingCard from "./sms-listings-card"
//#endregion

interface SmsListingsViewrops extends Pick<SmsSenderType, "name" | "types"> {}

const SmsListingsView = memo(({ name, types }: SmsListingsViewrops) => {
	const { t } = useTranslation("sms-senders")

	const [paginationState, setPaginationState] = useState<{ limit?: number; offset?: number }>({ limit: 25, offset: 0 })

	const params = useParams()

	// channel type: "local" | "international"
	const channelType: SmsChannelTypeOption = Object.values(params)[0] as SmsChannelTypeOption

	const senderId = params.senderId

	const [typeFilter, setTypeFilter] = useState<TemplateType>(
		templateTypesOptions?.filter((type) => types.includes(type.value))[0]?.value
	)

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
			<div className={twMerge("flex h-full w-full flex-col p-8 pb-0", isFetching && "pointer-events-none opacity-50")}>
				<div className='mb-8 flex flex-row flex-wrap justify-between'>
					<div className='flex flex-row gap-5'>
						{templateTypesOptions
							?.filter((type) => types.includes(type.value))
							?.map((type) => (
								<Button
									className={typeFilter !== type.value ? "bg-[#F7F7F7] font-normal text-black" : ""}
									key={type.value}
									onClick={() => setTypeFilter(type.value)}
									variant='secondary'>
									{type.label}
								</Button>
							))}
					</div>

					<SmsSenderRequestDialog defaultValues={{ sender: name }} formType='addRequest'>
						<Button>
							<HeroiconsPlus16Solid />
							{t("views.smsListingsView.actions.addRequest")}
						</Button>
					</SmsSenderRequestDialog>
				</div>

				<div className='flex-1 overflow-y-auto'>
					<div className='flex flex-row flex-wrap gap-9 '>
						{list?.map((listing, idx) => <SmsListingCard key={idx} {...listing} />)}
					</div>
				</div>

				<Pagination
					count={count || 0}
					pagination={{ limit: paginationState?.limit, offset: paginationState?.offset }}
					updatePagination={(pagination) => setPaginationState(pagination)}
				/>
			</div>
		)
})

SmsListingsView.displayName = "SmsListingsView"

export default SmsListingsView
