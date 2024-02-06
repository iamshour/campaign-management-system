//#region Import
import { lazy } from "react"

import removeSpaces from "@/core/utils/remove-spaces"
import { Badge, type ColumnType } from "@/ui"
import { format } from "@/utils"

import type { SmsTemplateType, SmsTemplateStatusOption } from "../types"

import smsTemplateFieldsLocaleMap from "./sms-template-fields-locale-map"
import smsTemplateStatusesColorsMap from "./sms-template-statuses-colors-map"

// eslint-disable-next-line react-refresh/only-export-components
const MySmsTemplatesViewTableActions = lazy(
	() => import("../views/sms-templates-view/sms-templates-view-table-actions")
)
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
		cell: (updatedAt) => {
			const isoDate = removeSpaces(updatedAt)
			const jsDateObject = new Date(isoDate)

			if (!jsDateObject) return <>INVALID DATE</>

			return format(jsDateObject, "MM-dd-yyyy | hh:mm aaa")
		},
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
		cell: (_, { id }) => <MySmsTemplatesViewTableActions id={id} />,
	},
]

export default smsTemplatesTableColumns
