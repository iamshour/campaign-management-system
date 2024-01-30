//#region Import
import type { ContactExportStatusOption } from "../types"
//#endregion

const exportStatusOptions: Record<ContactExportStatusOption, string> = {
	IN_PROGRESS: "exports:components.statusesPopover.options.processing",
	FAILED: "exports:components.statusesPopover.options.failed",
	COMPLETED: "exports:components.statusesPopover.options.ready",
}

export default exportStatusOptions
