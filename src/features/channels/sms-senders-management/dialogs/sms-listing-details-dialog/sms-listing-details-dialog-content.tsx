//#region Import
import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import getCountryName from "@/core/utils/get-country-name"
import { useGetSmsListingByIdQuery } from "@/features/channels/common/api"
import smsListingStatusesColorsMap from "@/features/channels/common/constants/sms-listing-statuses-colors-map"
import smsListingStatusesLocaleMap from "@/features/channels/common/constants/sms-listing-statuses-locale-map"
import ReadonlyField from "@/features/channels/sms-senders-management/components/readonly-field"
import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { Skeleton } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MaterialSymbolsPerson from "~icons/material-symbols/person"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsListingDetailsDialogContent = ({ id }: { id: string }) => {
	const { t } = useTranslation("channels-common")

	const { data, isError, isFetching } = useGetSmsListingByIdQuery(id, { skip: !id, ...baseQueryConfigs })

	if (isFetching) return <Skeleton className='h-full' />

	if (!isFetching && (!!isError || !data)) return <DisplayError />

	return (
		<div className='flex flex-col gap-4 overflow-y-auto p-2'>
			<div className='space-y-4 rounded-xl bg-[#F7F7F7] p-4'>
				<SectionHeading
					className='text-base'
					icon={MaterialSymbolsPerson}
					label={t("senders-management:dialogs.smsListingDetails.otherInfo")}
				/>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4'>
					<ReadonlyField label={t("fields.company")}>{data?.company}</ReadonlyField>

					{/* FIXME: SENDER DOES NOT EXIST IN LISTING.. IN DESIGN IT DOES  */}
					<ReadonlyField label={t("fields.sender")}>{data?.sourceId}</ReadonlyField>

					<ReadonlyField label={t("fields.type")}>{t(templateTypesLocaleMap[data!.category!])}</ReadonlyField>

					<ReadonlyField label={t("fields.country")}>{getCountryName(data!.country)}</ReadonlyField>

					<ReadonlyField label={t("fields.updatedAt")}>
						<DataViewDateCell date={data?.updatedAt} dateFormat='MM-dd-yyyy | hh:mm aaa' />
					</ReadonlyField>

					<ReadonlyField label={t("fields.listingStatus")}>
						<ColoredBullet color={smsListingStatusesColorsMap[data!.status!]} />
						{t(smsListingStatusesLocaleMap[data!.status!])}
					</ReadonlyField>

					<ReadonlyField label={t("fields.sampleContent")} showTooltip>
						{data!.sampleContent}
					</ReadonlyField>

					{!!data?.statusReason && (
						<ReadonlyField label={t("fields.action")} showTooltip>
							{data!.statusReason}
						</ReadonlyField>
					)}
				</div>
			</div>
		</div>
	)
}

export default SmsListingDetailsDialogContent

const ColoredBullet = ({ color }: { color: string }) => (
	<span className='me-2 inline-block h-3 w-3 rounded-full' style={{ backgroundColor: color }} />
)