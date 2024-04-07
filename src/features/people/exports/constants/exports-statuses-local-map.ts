//#region Import
import type { ContactExportStatusOption } from "../types"
//#endregion

const exportsStatusesLocalMap: Record<ContactExportStatusOption, string> = {
	COMPLETED: "exports:components.selectMultiExportsStatusesPopover.options.completed",
	FAILED: "exports:components.selectMultiExportsStatusesPopover.options.failed",
	IN_PROGRESS: "exports:components.selectMultiExportsStatusesPopover.options.processing",
}

export default exportsStatusesLocalMap
