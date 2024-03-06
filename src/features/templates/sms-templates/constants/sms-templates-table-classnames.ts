//#region Import
import type { DataTableProps } from "@/core/components/data-view/data-table/types"

import type { SmsTemplateType } from "../types"
//#endregion

/**
 * Custom classNames passed to style DataView used in `SmsTemplatesView`
 */
const smsTemplatesTableClassNames: DataTableProps<SmsTemplateType>["classNames"] = {
	emptyTableCell: "cursor-default bg-white h-[calc(100vh-360px)]",
	table: "border-separate border-spacing-y-[20px] -mt-[20px]",
	tbodyTd: "first:rounded-s-[12px] last:rounded-e-[12px] py-[20px]",
	tbodyTr: "bg-[#F7F7F7] cursor-pointer ",
}

export default smsTemplatesTableClassNames
