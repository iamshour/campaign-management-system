//#region Import
import type { ContactExportStatusOption } from "../types"
//#endregion

const exportStatusOptions: Record<ContactExportStatusOption, string> = {
	COMPLETED: "exports:components.statusesPopover.options.ready",
	FAILED: "exports:components.statusesPopover.options.failed",
	IN_PROGRESS: "exports:components.statusesPopover.options.processing",
}

export default exportStatusOptions
