//#region Import
import type { FetchListingRequestDetailsIds } from "@/features/channels/common/types/data.types"

import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getCountryName from "@/core/utils/get-country-name"
import smsListingRequestActionsColorsMap from "@/features/channels/common/constants/sms-listing-request-actions-colors-map"
import smsListingRequestsActionsLocalMap from "@/features/channels/common/constants/sms-listing-request-actions-local-map"
import smsListingStatusesColorsMap from "@/features/channels/common/constants/sms-listing-statuses-colors-map"
import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import { useGetChannelSourceRequestAndListingByIdQuery } from "@/features/channels/sms-senders-management/api"
import ReadonlyField from "@/features/channels/sms-senders-management/components/readonly-field"
import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { Skeleton } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MaterialSymbolsPerson from "~icons/material-symbols/person"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

export interface ChannelSourceRequestDetailsDialogContentProps {
	/**
	 * Ids used to fetch  passed `ChannelSourceRequestDetails` & `ChannelSourceListingDetails`
	 */
	ids?: FetchListingRequestDetailsIds
}

const ChannelSourceRequestDetailsDialogContent = ({ ids }: ChannelSourceRequestDetailsDialogContentProps) => {
	const { t } = useTranslation("channels-common")

	const { data, isError, isFetching } = useGetChannelSourceRequestAndListingByIdQuery(ids!, {
		skip: !ids?.channelSourceListingId || !ids?.channelSourceRequestId,
		...baseQueryConfigs,
	})

	if (isFetching) return <Skeleton className='h-full' />

	if (!isFetching && (!!isError || data === undefined)) return <DisplayError />

	return (
		<div className='flex flex-col gap-4 overflow-y-auto'>
			<div className='space-y-4 rounded-xl bg-[#F7F7F7] p-4'>
				<SectionHeading
					className='text-base'
					icon={MaterialSymbolsPerson}
					label={t("senders-management:dialogs.channelSourceRequestDetails.senderRequestInfo")}
				/>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4'>
					<ReadonlyField label={t("fields.requesterUserEmail")}>{data?.userEmail}</ReadonlyField>

					<ReadonlyField label={t("fields.company")}>{data?.company.name}</ReadonlyField>

					<ReadonlyField label={t("fields.sender")}>{data?.channelSourceName}</ReadonlyField>

					<ReadonlyField label={t("fields.type")}>{t(templateTypesLocaleMap[data!.templateType])}</ReadonlyField>

					<ReadonlyField label={t("fields.country")}>{getCountryName(data!.country)}</ReadonlyField>

					<ReadonlyField label={t("fields.updatedAt")}>
						<DataViewDateCell date={data?.updatedAt} dateFormat='MM-dd-yyyy | hh:mm aaa' />
					</ReadonlyField>

					<ReadonlyField label={t("fields.sampleContent")} showTooltip>
						{data!.sample}
					</ReadonlyField>

					{!!data?.note && (
						<ReadonlyField label={t("fields.note")} showTooltip>
							{data.note}
						</ReadonlyField>
					)}

					{!!data?.action && (
						<ReadonlyField className='h-[120px]' label={t("fields.action")}>
							<ColoredBullet color={smsListingRequestActionsColorsMap[data.action]} />
							{t(smsListingRequestsActionsLocalMap[data.action])}
						</ReadonlyField>
					)}

					{!!data?.actionReason && (
						<ReadonlyField label={t("fields.actionReason")} showTooltip>
							{data.actionReason}
						</ReadonlyField>
					)}
				</div>
			</div>

			<div className='space-y-4 rounded-xl bg-[#F7F7F7] p-4'>
				<SectionHeading
					className='text-base'
					icon={MaterialSymbolsPerson}
					label={t("senders-management:dialogs.channelSourceRequestDetails.senderStatusInfo")}
				/>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4'>
					<ReadonlyField className='h-[120px]' label={t("fields.currentSenderStatus")}>
						<ColoredBullet
							color={smsListingStatusesColorsMap[data!.channelSourceListingDetails.channelSourceListingStatus]}
						/>
						{t(smsListingStatusesLocaleMap[data!.channelSourceListingDetails.channelSourceListingStatus])}
					</ReadonlyField>

					{!!data?.channelSourceListingDetails.channelSourceListingStatusReason && (
						<ReadonlyField label={t("fields.statusReason")} showTooltip>
							{data.channelSourceListingDetails.channelSourceListingStatusReason}
						</ReadonlyField>
					)}
				</div>
			</div>
		</div>
	)
}

export default ChannelSourceRequestDetailsDialogContent

const ColoredBullet = ({ color }: { color: string }) => (
	<span className='me-2 inline-block h-3 w-3 rounded-full' style={{ backgroundColor: color }} />
)
