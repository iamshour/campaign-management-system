//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import type { SmsListingRequest } from "../types"

import smsListingRequestsFieldsLocaleMap from "./sms-listing-requests-fields-locale-map"

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
		header: smsListingRequestsFieldsLocaleMap.company,
		sortable: true,
	},
	{
		accessorKey: "sender",
		header: smsListingRequestsFieldsLocaleMap.sender,
		sortable: true,
	},
	{
		accessorKey: "type",
		cell: (_, { type }) => <TemplateTypesTableColumn types={[type]} />,
		header: smsListingRequestsFieldsLocaleMap.type,
	},
	{
		accessorKey: "country",
		cell: (_, { country }) => getCountryName(country),
		header: smsListingRequestsFieldsLocaleMap.country,
		sortable: true,
	},
	{
		accessorKey: "action",
		cell: (_, { action }) => !!action && <SmsListingRequestsCompletedViewActionColumn action={action} />,
		header: smsListingRequestsFieldsLocaleMap.action,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} />,
		header: smsListingRequestsFieldsLocaleMap.updatedAt,
		sortable: true,
	},
]

export default smsListingRequestsCompletedTableColumns
