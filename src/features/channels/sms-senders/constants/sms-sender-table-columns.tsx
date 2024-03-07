//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { lazy } from "react"

import type { SmsSenderType } from "../types"

import SmsSendersListViewTableActions from "../views/sms-senders-view/sms-senders-list-view-table-actions"
import smsSenderFieldsLocaleMap from "./sms-sender-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const smsSendersTableColumns: ColumnType<SmsSenderType>[] = [
	{
		accessorKey: "name",
		header: smsSenderFieldsLocaleMap.name,
		sortable: true,
	},
	{
		accessorKey: "types",
		cell: (_, { types }) => <TemplateTypesTableColumn types={types} />,
		header: smsSenderFieldsLocaleMap.types,
	},
	{
		accessorKey: "createdAt",
		cell: (date) => <DataViewDateCell date={date} />,
		header: smsSenderFieldsLocaleMap.createdAt,
		sortable: true,
	},
	{
		accessorKey: "actions",
		cell: (_, { id, name }) => <SmsSendersListViewTableActions id={id} name={name} />,
	},
]

export default smsSendersTableColumns
