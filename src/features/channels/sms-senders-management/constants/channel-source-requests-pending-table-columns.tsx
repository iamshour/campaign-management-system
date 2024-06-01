//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import type { ChannelSourceRequest } from "../types/data.types"

import smsListingRequestsFieldsLocaleMap from "./sms-listing-requests-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const ChannelSourceRequestsPendingActions = lazy(
	() => import("../views/channel-source-requests-pending-view/channel-source-requests-pending-actions")
)

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const channelSourceRequestsPendingTableColumns: ColumnType<ChannelSourceRequest>[] = [
	{
		accessorKey: "company",
		cell: (_, { company }) => company.name,
		header: smsListingRequestsFieldsLocaleMap.company,
		sortable: true,
	},
	{
		accessorKey: "channelSourceName",
		header: smsListingRequestsFieldsLocaleMap.channelSourceName,
		sortable: true,
	},
	{
		accessorKey: "templateType",
		cell: (type) => <TemplateTypesTableColumn types={[type]} />,
		header: smsListingRequestsFieldsLocaleMap.templateType,
	},
	{
		accessorKey: "country",
		cell: (country) => getCountryName(country),
		header: smsListingRequestsFieldsLocaleMap.country,
		sortable: true,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} />,
		header: smsListingRequestsFieldsLocaleMap.updatedAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { channelSourceName, channelSourceRequestId, country }) => (
			<ChannelSourceRequestsPendingActions
				channelSourceName={channelSourceName}
				channelSourceRequestId={channelSourceRequestId}
				country={country}
			/>
		),
		preventCellClick: true,
	},
]

export default channelSourceRequestsPendingTableColumns
