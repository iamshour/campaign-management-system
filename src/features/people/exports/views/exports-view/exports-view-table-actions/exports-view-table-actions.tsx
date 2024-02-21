//#region Import
import { memo } from "react"
import { useTranslation } from "react-i18next"

import DeleteExportsDialog from "@/features/people/exports/dialogs/delete-exports-dialog/delete-exports-dialog"
import type { ContactExports } from "@/features/people/exports/types"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"

import ExportViewDownloadActionWrapper from "./exports-view-dowload-action-wrapper"

//#endregion

const ExportsViewTableActions = memo((props: Pick<ContactExports, "id" | "fileName" | "contactExportStatus">) => {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportTableActions" })

	return (
		<ActionsDropdown>
			<ExportViewDownloadActionWrapper {...props}>
				<ActionsDropdown.Item>{t("download")}</ActionsDropdown.Item>
			</ExportViewDownloadActionWrapper>

			<ActionsDropdown.Separator />

			<DeleteExportsDialog id={props?.id}>
				<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>
			</DeleteExportsDialog>
		</ActionsDropdown>
	)
})

ExportsViewTableActions.displayName = "ExportsViewTableActions"

export default ExportsViewTableActions
