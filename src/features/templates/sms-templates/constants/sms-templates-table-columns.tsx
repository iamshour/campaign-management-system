//#region Import
import { lazy } from "react"

import { Badge, type ColumnType } from "@/ui"

import type {
	SmsTemplateType,
	SmsTemplateStatusOption,
	SmsTemplateTypeOption,
	SmsTemplateLanguageOption,
} from "../types"

import smsTemplateFieldsLocaleMap from "./sms-template-fields-locale-map"
import { smsTemplateLanguagesLocaleMap } from "./sms-template-languages-options"
import smsTemplateStatusesColorsMap from "./sms-template-statuses-colors-map"
import { smsTemplateStatusesLocaleMap } from "./sms-template-statuses-options"
import { smsTemplateTypesLocaleMap } from "./sms-template-types-options"

// eslint-disable-next-line react-refresh/only-export-components
const DataGridDateCell = lazy(() => import("@/core/components/data-grid-date-cell"))
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
		cell: (type: SmsTemplateTypeOption) => smsTemplateTypesLocaleMap[type],
	},
	{
		accessorKey: "language",
		header: smsTemplateFieldsLocaleMap.language,
		cell: (language: SmsTemplateLanguageOption) => smsTemplateLanguagesLocaleMap[language],
	},
	{
		accessorKey: "updatedAt",
		header: smsTemplateFieldsLocaleMap.updatedAt,
		sortable: true,
		cell: (date) => <DataGridDateCell date={date} dateFormat='MM-dd-yyyy | hh:mm aaa' />,
	},
	{
		accessorKey: "status",
		header: smsTemplateFieldsLocaleMap.status,
		cell: (status: SmsTemplateStatusOption) =>
			!!status?.length && (
				<Badge key={status} className='rounded-md' style={{ backgroundColor: smsTemplateStatusesColorsMap[status] }}>
					{smsTemplateStatusesLocaleMap[status]}
				</Badge>
			),
	},
]

export default smsTemplatesTableColumns
