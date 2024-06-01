//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { ChannelSourceRequest } from "@/features/channels/sms-senders-management/types/data.types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import smsListingRequestsFieldsLocaleMap from "./sms-listing-requests-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const ChannelSourceRequestsCompletedViewActionColumn = lazy(
	() => import("../views/channel-source-requests-completed-view/channel-source-requests-completed-view-action-column")
)

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const channelSourceRequestsCompletedTableColumns: ColumnType<ChannelSourceRequest>[] = [
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
		cell: (_, { templateType }) => <TemplateTypesTableColumn types={[templateType]} />,
		header: smsListingRequestsFieldsLocaleMap.templateType,
	},
	{
		accessorKey: "country",
		cell: (_, { country }) => getCountryName(country),
		header: smsListingRequestsFieldsLocaleMap.country,
		sortable: true,
	},
	{
		accessorKey: "action",
		cell: (_, { action }) => !!action && <ChannelSourceRequestsCompletedViewActionColumn action={action} />,
		header: smsListingRequestsFieldsLocaleMap.action,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} />,
		header: smsListingRequestsFieldsLocaleMap.updatedAt,
		sortable: true,
	},
]

export default channelSourceRequestsCompletedTableColumns
