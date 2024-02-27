//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import { Badge } from "@/ui"
import { lazy } from "react"

import type {
	SmsTemplateLanguageOption,
	SmsTemplateStatusOption,
	SmsTemplateType,
	SmsTemplateTypeOption,
} from "../types"

import smsTemplateFieldsLocaleMap from "./sms-template-fields-locale-map"
import smsTemplateLanguagesLocaleMap from "./sms-template-languages-local-map"
import smsTemplateStatusesColorsMap from "./sms-template-statuses-colors-map"
import smsTemplateStatusesLocaleMap from "./sms-template-statuses-local-map"
import smsTemplateTypesLocaleMap from "./sms-template-types-local-map"

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
		cell: (type: SmsTemplateTypeOption) => smsTemplateTypesLocaleMap[type],
		header: smsTemplateFieldsLocaleMap.type,
	},
	{
		accessorKey: "language",
		cell: (language: SmsTemplateLanguageOption) => smsTemplateLanguagesLocaleMap[language],
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
		cell: (status: SmsTemplateStatusOption) =>
			!!status?.length && (
				<Badge className='rounded-md' key={status} style={{ backgroundColor: smsTemplateStatusesColorsMap[status] }}>
					{smsTemplateStatusesLocaleMap[status]}
				</Badge>
			),
		header: smsTemplateFieldsLocaleMap.status,
	},
]

export default smsTemplatesTableColumns
