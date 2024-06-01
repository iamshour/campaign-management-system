//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import { lazy } from "react"

import TemplateStatusTableCell from "../components/template-status-table-cell"
import smsTemplateFieldsLocaleMap from "./sms-template-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const TemplateLanguageTableCell = lazy(() => import("../components/template-language-table-cell"))

// eslint-disable-next-line react-refresh/only-export-components
const TemplateTypesTableColumn = lazy(() => import("@/features/templates/common/components/template-types-table-cell"))

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const smsTemplatesTableColumns: ColumnType<SmsTemplateType>[] = [
	{
		accessorKey: "selection",
		rowIdSelector: "id",
	},
	{
		accessorKey: "name",
		header: smsTemplateFieldsLocaleMap.name,
		sortable: true,
	},
	{
		accessorKey: "type",
		cell: (type) => <TemplateTypesTableColumn types={[type]} />,
		header: smsTemplateFieldsLocaleMap.type,
	},
	{
		accessorKey: "language",
		cell: (_, { language }) => <TemplateLanguageTableCell language={language} />,
		header: smsTemplateFieldsLocaleMap.language,
	},
	{
		accessorKey: "updatedAt",
		cell: (date) => <DataViewDateCell date={date} dateFormat='MM-dd-yyyy | hh:mm aaa' />,
		header: smsTemplateFieldsLocaleMap.updatedAt,
		sortable: true,
	},
	{
		accessorKey: "status",
		cell: (_, { status }) => !!status?.length && <TemplateStatusTableCell status={status} />,
		header: smsTemplateFieldsLocaleMap.status,
	},
]

export default smsTemplatesTableColumns
