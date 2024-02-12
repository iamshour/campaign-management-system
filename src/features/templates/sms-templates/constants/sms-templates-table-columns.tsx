//#region Import
import { lazy } from "react"

import { Badge, type ColumnType } from "@/ui"

import type { SmsTemplateType, SmsTemplateStatusOption } from "../types"

import smsTemplateFieldsLocaleMap from "./sms-template-fields-locale-map"
import smsTemplateStatusesColorsMap from "./sms-template-statuses-colors-map"

// eslint-disable-next-line react-refresh/only-export-components
const AdvancedTableDateCell = lazy(() => import("@/core/components/advanced-table-date-cell"))

// eslint-disable-next-line react-refresh/only-export-components
const SmsTemplatesViewTableActions = lazy(() => import("../views/sms-templates-view/sms-templates-view-table-actions"))
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
		header: smsTemplateFieldsLocaleMap.type,
	},
	{
		accessorKey: "language",
		header: smsTemplateFieldsLocaleMap.language,
	},
	{
		accessorKey: "updatedAt",
		header: smsTemplateFieldsLocaleMap.updatedAt,
		sortable: true,
		cell: (date) => <AdvancedTableDateCell date={date} dateFormat='MM-dd-yyyy | hh:mm aaa' />,
	},
	{
		accessorKey: "status",
		header: smsTemplateFieldsLocaleMap.status,
		cell: (status: SmsTemplateStatusOption) => (
			<Badge key={status} className='rounded-md' style={{ backgroundColor: smsTemplateStatusesColorsMap[status] }}>
				{status}
			</Badge>
		),
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SmsTemplatesViewTableActions id={id} />,
	},
]

export default smsTemplatesTableColumns
