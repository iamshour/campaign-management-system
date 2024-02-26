//#region Import
import type { DataGridTableProps } from "@/core/components/data-grid/types"

import type { SmsTemplateType } from "../types"
//#endregion

/**
 * Custom classNames passed to style DataGrid used in `SmsTemplatesView`
 */
const smsTemplatesTableClassNames: DataGridTableProps<SmsTemplateType>["classNames"] = {
	emptyTableCell: "cursor-default bg-white h-[calc(100vh-360px)]",
	table: "border-separate border-spacing-y-[20px] -mt-[20px]",
	tbodyTd: "first:rounded-s-[12px] last:rounded-e-[12px] py-[20px]",
	tbodyTr: "bg-[#F7F7F7] cursor-pointer ",
	wrapper: "px-4",
}

export default smsTemplatesTableClassNames
