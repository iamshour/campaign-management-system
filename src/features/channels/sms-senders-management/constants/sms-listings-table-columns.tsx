//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SmsListingType } from "@/features/channels/common/types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import smsListingsFieldsLocalMap from "./sms-listings-fields-local-map"

// eslint-disable-next-line react-refresh/only-export-components
const AdminSmsListingsViewStatusTableCell = lazy(
	() => import("../views/admin-sms-listings-view/admin-sms-listings-view-status-table-cell")
)

// eslint-disable-next-line react-refresh/only-export-components
const AdminSmsListingsTableActions = lazy(
	() => import("../views/admin-sms-listings-view/admin-sms-listings-table-actions")
)

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const smsListingsTableColumns: ColumnType<SmsListingType>[] = [
	{
		accessorKey: "company",
		header: smsListingsFieldsLocalMap.company,
		sortable: true,
	},
	{
		accessorKey: "category",
		cell: (_, { category }) => <TemplateTypesTableColumn types={[category]} />,
		header: smsListingsFieldsLocalMap.category,
	},
	{
		accessorKey: "country",
		cell: (_, { country }) => getCountryName(country),
		header: smsListingsFieldsLocalMap.country,
	},
	{
		accessorKey: "status",
		cell: (_, { status }) => <AdminSmsListingsViewStatusTableCell status={status} />,
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
		cell: (_, { company, country, listingId }) => (
			<AdminSmsListingsTableActions company={company} country={country} listingId={listingId} />
		),
		preventCellClick: true,
	},
]

export default smsListingsTableColumns
