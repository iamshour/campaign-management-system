//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDownloadExportMutation } from "@/features/people/exports/api"
import type { ContactExports } from "@/features/people/exports/types"
import { Slot } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
//#endregion

interface ExportViewDownloadActionWrapperProps extends Pick<ContactExports, "id" | "fileName" | "contactExportStatus"> {
	/**
	 * Dropdown.Item that will trigger export download
	 */
	children: React.ReactElement
}

function ExportViewDownloadActionWrapper({
	id,
	fileName,
	contactExportStatus,
	children,
}: ExportViewDownloadActionWrapperProps) {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportTableActions" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDownloadExport] = useDownloadExportMutation()

	const canDownloadExport = contactExportStatus === "COMPLETED"

	const handleDownload = async () => {
		if (!canDownloadExport) return

		const res = await triggerDownloadExport({ id, fileName }).unwrap()

		closeDropdown()

		if (res?.ok) return toast.success(t("downloadSuccess"))
	}

	return (
		<Slot onClick={handleDownload} className={!canDownloadExport ? "pointer-events-none opacity-50" : ""}>
			{children}
		</Slot>
	)
}

export default ExportViewDownloadActionWrapper
