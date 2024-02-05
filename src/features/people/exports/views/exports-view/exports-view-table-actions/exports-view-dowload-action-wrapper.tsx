//#region Import
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useDownloadExportMutation } from "@/features/people/exports/api"
import type { ContactExports } from "@/features/people/exports/types"
import { Slot } from "@/ui"
//#endregion

interface ExportViewDownloadActionWrapperProps extends Pick<ContactExports, "id" | "fileName" | "contactExportStatus"> {
	/**
	 * Closes the actions dropdown in table row
	 */
	closeActionsDropDown: () => void

	/**
	 * Dropdown.Item that will trigger export download
	 */
	children: React.ReactElement
}

function ExportViewDownloadActionWrapper({
	id,
	fileName,
	contactExportStatus,
	closeActionsDropDown,
	children,
}: ExportViewDownloadActionWrapperProps) {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportTableActions" })
	const [triggerDownloadExportMutation] = useDownloadExportMutation()

	const canDownloadExport = contactExportStatus === "COMPLETED"

	const handleDownload = async () => {
		if (!canDownloadExport) return

		const res = await triggerDownloadExportMutation({ id, fileName }).unwrap()

		closeActionsDropDown()

		if (res?.ok) return toast.success(t("downloadSuccess"))
	}

	return (
		<Slot onClick={handleDownload} className={!canDownloadExport ? "pointer-events-none opacity-50" : ""}>
			{children}
		</Slot>
	)
}

export default ExportViewDownloadActionWrapper
