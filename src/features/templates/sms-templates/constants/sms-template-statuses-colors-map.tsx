//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"
//#endregion

const smsTemplateStatusesColorsMap: Record<TemplateStatus, string> = {
	DRAFT: "#DBDBDB",
	PUBLISHED: "#9EC654",
}

export default smsTemplateStatusesColorsMap
