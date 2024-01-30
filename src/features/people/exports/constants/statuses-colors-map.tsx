import type { ContactExportStatusOption } from "../types"

const exportStatusesColorsMap: Record<ContactExportStatusOption, string> = {
	FAILED: "#EB2344",
	IN_PROGRESS: "#2DAEF5",
	COMPLETED: "#75AF08",
}

export default exportStatusesColorsMap
