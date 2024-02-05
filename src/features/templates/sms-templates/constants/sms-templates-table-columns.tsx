//#region Import
import { lazy } from "react"

import { Badge, type ColumnType } from "@/ui"
import { format } from "@/utils"

import type { SmsTemplate, SmsTemplateStatusOption } from "../types"

import smsTemplatesFieldsMap from "./sms-templates-fields-map"
import smsTemplatesStatusesColorsMap from "./statuses-colors-map"

// eslint-disable-next-line react-refresh/only-export-components
const MySmsTemplatesViewTableActions = lazy(
	() => import("../views/my-sms-templates-view/my-sms-templates-view-table-actions")
)
//#endregion

const smsTemplatesTableColumns: ColumnType<SmsTemplate>[] = [
	{
		accessorKey: "selection",
		rowIdSelector: "id",
	},
	{
		accessorKey: "name",
		header: smsTemplatesFieldsMap.name,
		sortable: true,
	},
	{
		accessorKey: "type",
		header: smsTemplatesFieldsMap.type,
	},
	{
		accessorKey: "language",
		header: smsTemplatesFieldsMap.language,
	},
	{
		accessorKey: "updatedAt",
		header: smsTemplatesFieldsMap.updatedAt,
		sortable: true,
		cell: (updatedAt) => format(new Date(updatedAt), "MM-dd-yyyy | hh:mm aaa"),
	},
	{
		accessorKey: "status",
		header: smsTemplatesFieldsMap.status,
		cell: (status: SmsTemplateStatusOption) => (
			<Badge key={status} className='rounded-md' style={{ backgroundColor: smsTemplatesStatusesColorsMap[status] }}>
				{status}
			</Badge>
		),
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <MySmsTemplatesViewTableActions id={id} />,
	},
]

export default smsTemplatesTableColumns
