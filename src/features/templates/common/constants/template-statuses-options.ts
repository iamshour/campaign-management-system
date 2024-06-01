//#region Import
import type { TemplateStatus } from "@/features/templates/common/types"

import templateStatusesLocaleMap from "./template-statuses-local-map"
//#endregion

const templateStatusesOptions = (Object.entries(templateStatusesLocaleMap) as [TemplateStatus, string][])?.map(
	([value, label]) => ({ label, value })
)

export default templateStatusesOptions
