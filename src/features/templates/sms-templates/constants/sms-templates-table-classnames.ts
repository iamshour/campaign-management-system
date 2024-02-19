import { TableProps } from "@/ui"

import type { SmsTemplateType } from "../types"

/**
 * Custom classNames passed to style DataGrid used in `SmsTemplatesView`
 */
const smsTemplatesTableClassNames: TableProps<SmsTemplateType>["classNames"] = {
	wrapper: "px-4",
	table: "border-separate border-spacing-y-[20px] -mt-[20px]",
	tbodyTr: "bg-[#F7F7F7] cursor-pointer ",
	tbodyTd: "first:rounded-s-[12px] last:rounded-e-[12px] py-[20px]",
	emptyTableCell: "cursor-default bg-white h-[calc(100vh-360px)]",
}

export default smsTemplatesTableClassNames
