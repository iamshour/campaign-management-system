//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"
import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { TemplateType } from "@/features/templates/common/types"
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
		cell: (type: TemplateType) => templateTypesLocaleMap[type],
		header: smsListingRequestsFieldsLocalMap.type,
	},
	{
		accessorKey: "targetCountry",
		cell: (countryCode) => getCountryName(countryCode),
		header: smsListingRequestsFieldsLocalMap.targetCountry,
		sortable: true,
	},
	{
		accessorKey: "dateTime",
		cell: (date) => <DataViewDateCell date={date} dateFormat='MM-dd-yyyy' />,
		header: smsListingRequestsFieldsLocalMap.dateTime,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SmsListingRequestsPendingActions id={id} />,
		preventCellClick: true,
	},
]

export default smsListingRequestsPendingTableColumns
