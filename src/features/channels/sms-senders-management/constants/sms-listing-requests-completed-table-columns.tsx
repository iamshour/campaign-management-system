//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import type { SmsListingRequest } from "../types"

import smsListingRequestsFieldsLocalMap from "./sms-listing-requests-fields-local-map"

// eslint-disable-next-line react-refresh/only-export-components
const SmsListingRequestsCompletedViewActionColumn = lazy(
	() => import("../views/sms-listing-requests-completed-view/sms-listing-requests-completed-view-action-column")
)

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const smsListingRequestsCompletedTableColumns: ColumnType<SmsListingRequest>[] = [
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
		cell: (_, { type }) => <TemplateTypesTableColumn types={[type]} />,
		header: smsListingRequestsFieldsLocalMap.type,
	},
	{
		accessorKey: "targetCountry",
		cell: (_, { targetCountry }) => getCountryName(targetCountry),
		header: smsListingRequestsFieldsLocalMap.targetCountry,
		sortable: true,
	},
	{
		accessorKey: "action",
		cell: (_, { action }) => !!action && <SmsListingRequestsCompletedViewActionColumn action={action} />,
		header: smsListingRequestsFieldsLocalMap.action,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} />,
		header: smsListingRequestsFieldsLocalMap.updatedAt,
		sortable: true,
	},
]

export default smsListingRequestsCompletedTableColumns
