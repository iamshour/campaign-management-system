//#region Import
import type { ContactExports } from "@/features/people/exports/types"

import { useDownloadExportMutation } from "@/features/people/exports/api"
import { Slot } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

interface ExportViewDownloadActionWrapperProps extends Pick<ContactExports, "contactExportStatus" | "fileName" | "id"> {
	/**
	 * Dropdown.Item that will trigger export download
	 */
	children: React.ReactElement
}

function ExportViewDownloadActionWrapper({
	children,
	contactExportStatus,
	fileName,
	id,
}: ExportViewDownloadActionWrapperProps) {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportTableActions" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerDownloadExport] = useDownloadExportMutation()

	const canDownloadExport = contactExportStatus === "COMPLETED"

	const handleDownload = async () => {
		if (!canDownloadExport) return

		const res = await triggerDownloadExport({ fileName, id }).unwrap()

		closeDropdown()

		if (res?.ok) return toast.success(t("downloadSuccess"))
	}

	return (
		<Slot className={!canDownloadExport ? "pointer-events-none opacity-50" : ""} onClick={handleDownload}>
			{children}
		</Slot>
	)
}

export default ExportViewDownloadActionWrapper
