import type { ContactExportStatusOption } from "../types"

const exportStatusesColorsMap: Record<ContactExportStatusOption, string> = {
	COMPLETED: "#75AF08",
	FAILED: "#EB2344",
	IN_PROGRESS: "#2DAEF5",
}

export default exportStatusesColorsMap
