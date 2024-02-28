//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { lazy } from "react"

import type { SmsSenderType, SmsSenderTypeOption } from "../types"

import smsSenderFieldsLocaleMap from "./sms-sender-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const smsSendersTableColumns: ColumnType<SmsSenderType>[] = [
	{
		accessorKey: "selection",
		rowIdSelector: "id",
	},
	{
		accessorKey: "name",
		header: smsSenderFieldsLocaleMap.name,
		sortable: true,
	},
	{
		accessorKey: "type",
		cell: (type: SmsSenderTypeOption) => templateTypesLocaleMap[type],
		header: smsSenderFieldsLocaleMap.type,
	},
	{
		accessorKey: "createdAt",
		cell: (date) => <DataViewDateCell date={date} dateFormat='MM-dd-yyyy' />,
		header: smsSenderFieldsLocaleMap.createdAt,
		sortable: true,
	},
]

export default smsSendersTableColumns
