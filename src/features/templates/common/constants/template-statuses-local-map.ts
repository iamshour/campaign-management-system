//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"
//#endregion

const templateStatusesLocaleMap: Record<TemplateStatus, string> = {
	DRAFT: "templates-common:templateStatuses.draft",
	PUBLISHED: "templates-common:templateStatuses.published",
}

export default templateStatusesLocaleMap
