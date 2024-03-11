//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"
import type { TemplateType } from "@/features/templates/common/types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourceListingsQuery } from "@/features/channels/common/api"
import SmsSenderRequestDialog from "@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog"
import templateTypesOptions from "@/features/templates/common/constants/template-types-options"
import { Button, FullViewSkeleton, NoResultsFound, Pagination } from "@/ui"
import DisplayError from "@/ui/errors/display-error"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { memo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import SmsListingCard from "./sms-listings-card"
//#endregion

interface SmsListingsViewrops extends Pick<ChannelSource, "channelSourceName" | "templateTypes"> {}

const SmsListingsView = memo(({ channelSourceName, templateTypes }: SmsListingsViewrops) => {
	const { t } = useTranslation("sms-senders")

	const [paginationState, setPaginationState] = useState<{ limit: number; offset: number }>({ limit: 25, offset: 0 })

	const { channelSourceId } = useParams()

	const [templateType, setTemplateType] = useState<TemplateType>(
		templateTypesOptions?.filter((type) => templateTypes.includes(type.value))[0]?.value
	)

	const { count, error, isEmptyView, isError, isFetching, isInitialLoading, isReady, list } =
		useGetChannelSourceListingsQuery(
			{
				channelSourceId: channelSourceId!,
				templateType,
				...paginationState,
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
				skip: !templateType || !channelSourceId,
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
							?.filter((type) => templateTypes.includes(type.value))
							?.map((type) => (
								<Button
									className={templateType !== type.value ? "bg-[#F7F7F7] font-normal text-black" : ""}
									key={type.value}
									onClick={() => setTemplateType(type.value)}
									variant='secondary'>
									{t(type.label)}
								</Button>
							))}
					</div>

					<SmsSenderRequestDialog defaultValues={{ sender: channelSourceName }} formType='addRequest'>
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
					updatePagination={({ limit, offset }) => setPaginationState({ limit: limit ?? 0, offset: offset ?? 0 })}
				/>
			</div>
		)
})

SmsListingsView.displayName = "SmsListingsView"

export default SmsListingsView
