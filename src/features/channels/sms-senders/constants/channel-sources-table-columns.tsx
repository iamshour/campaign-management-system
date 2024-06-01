//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import { lazy } from "react"

import channelSourceFieldsLocaleMap from "./sms-sender-fields-locale-map"

// eslint-disable-next-line react-refresh/only-export-components
const TemplateTypesTableColumn = lazy(() => import("@/features/templates/common/components/template-types-table-cell"))

// eslint-disable-next-line react-refresh/only-export-components
const DataViewDateCell = lazy(() => import("@/core/components/data-view/data-view-date-cell"))
//#endregion

const channelSourcesTableColumns: ColumnType<ChannelSource>[] = [
	{
		accessorKey: "channelSourceName",
		header: channelSourceFieldsLocaleMap.channelSourceName,
		sortable: true,
	},
	{
		accessorKey: "templateTypes",
		cell: (_, { templateTypes }) => <TemplateTypesTableColumn types={templateTypes} />,
		header: channelSourceFieldsLocaleMap.templateTypes,
	},
	{
		accessorKey: "createdAt",
		cell: (date) => <DataViewDateCell date={date} dateFormat='MM-dd-yyyy | hh:mm aaa' />,
		header: channelSourceFieldsLocaleMap.createdAt,
		sortable: true,
	},
]

export default channelSourcesTableColumns
