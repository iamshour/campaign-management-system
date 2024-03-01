//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { TemplateLanguage, TemplateStatus, TemplateType } from "@/features/templates/common/types"

import templateLanguagesLocaleMap from "@/features/templates/common/constants/template-languages-local-map"
import templateStatusesLocaleMap from "@/features/templates/common/constants/template-statuses-local-map"
import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { Badge } from "@/ui"
import { lazy } from "react"

import type { SmsTemplateType } from "../types"

import smsTemplateFieldsLocaleMap from "./sms-template-fields-locale-map"
import smsTemplateStatusesColorsMap from "./sms-template-statuses-colors-map"

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
		cell: (type: TemplateType) => templateTypesLocaleMap[type],
		header: smsTemplateFieldsLocaleMap.type,
	},
	{
		accessorKey: "language",
		cell: (language: TemplateLanguage) => templateLanguagesLocaleMap[language],
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
		cell: (status: TemplateStatus) =>
			!!status?.length && (
				<Badge className='rounded-md' key={status} style={{ backgroundColor: smsTemplateStatusesColorsMap[status] }}>
					{templateStatusesLocaleMap[status]}
				</Badge>
			),
		header: smsTemplateFieldsLocaleMap.status,
	},
]

export default smsTemplatesTableColumns
