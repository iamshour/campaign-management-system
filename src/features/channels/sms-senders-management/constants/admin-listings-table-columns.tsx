//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import smsListingsFieldsLocalMap from "./sms-listings-fields-local-map"

// eslint-disable-next-line react-refresh/only-export-components
const AdminSmsListingsViewStatusTableCell = lazy(
	() => import("../views/admin-listings-view/admin-listings-view-status-table-cell")
)

// eslint-disable-next-line react-refresh/only-export-components
const AdminListingsViewTableActions = lazy(
	() => import("../views/admin-listings-view/admin-listings-view-table-actions")
)

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const adminListingsTableColumns: ColumnType<ChannelSourceListing>[] = [
	{
		accessorKey: "company",
		cell: (_, { company }) => company.name,
		header: smsListingsFieldsLocalMap.company,
		sortable: true,
	},
	{
		accessorKey: "templateType",
		cell: (_, { templateType }) => <TemplateTypesTableColumn types={[templateType]} />,
		header: smsListingsFieldsLocalMap.category,
	},
	{
		accessorKey: "country",
		cell: (_, { country }) => getCountryName(country),
		header: smsListingsFieldsLocalMap.country,
	},
	{
		accessorKey: "channelSourceListingStatus",
		cell: (_, { channelSourceListingStatus }) => (
			<AdminSmsListingsViewStatusTableCell status={channelSourceListingStatus} />
		),
		header: smsListingsFieldsLocalMap.status,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} dateFormat='MM-dd-yyyy | hh:mm aaa' />,
		header: smsListingsFieldsLocalMap.updatedAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { channelSourceListingStatus, company, country, id }) => (
			<AdminListingsViewTableActions
				channelSourceListingStatus={channelSourceListingStatus}
				company={company}
				country={country}
				id={id}
			/>
		),
		preventCellClick: true,
	},
]

export default adminListingsTableColumns
