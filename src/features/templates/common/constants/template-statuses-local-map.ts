//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"
//#endregion

const templateStatusesLocaleMap: Record<TemplateStatus, string> = {
	DRAFT: "Draft",
	PUBLISHED: "Published",
}

export default templateStatusesLocaleMap
