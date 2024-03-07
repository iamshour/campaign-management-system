//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import type { SmsListingRequest } from "../types"

import smsListingRequestsFieldsLocalMap from "./sms-listing-requests-fields-local-map"

// eslint-disable-next-line react-refresh/only-export-components
const SmsListingRequestsPendingActions = lazy(
	() => import("../views/sms-listing-requests-pending-view/sms-listing-requests-pending-actions")
)

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const smsListingRequestsPendingTableColumns: ColumnType<SmsListingRequest>[] = [
	{
		accessorKey: "company",
		header: smsListingRequestsFieldsLocalMap.company,
		sortable: true,
	},
	{
		accessorKey: "sender",
		header: smsListingRequestsFieldsLocalMap.sender,
		sortable: true,
	},
	{
		accessorKey: "type",
		cell: (type) => <TemplateTypesTableColumn types={[type]} />,
		header: smsListingRequestsFieldsLocalMap.type,
	},
	{
		accessorKey: "country",
		cell: (country) => getCountryName(country),
		header: smsListingRequestsFieldsLocalMap.country,
		sortable: true,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} />,
		header: smsListingRequestsFieldsLocalMap.updatedAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { country, id, sender }) => (
			<SmsListingRequestsPendingActions country={country} requestId={id} sourceName={sender} />
		),
		preventCellClick: true,
	},
]

export default smsListingRequestsPendingTableColumns
