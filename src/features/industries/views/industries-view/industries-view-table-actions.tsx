//#region Import
import type { IndustryType } from "@/features/industries/types"

import DeleteIndustryDialog from "@/features/industries/dialogs/delete-industry-dialog/delete-industry-dialog"
import EditIndustryDialog from "@/features/industries/dialogs/edit-industry-dialog/edit-industry-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

interface IndustriesViewTableActionsProps extends IndustryType {
	/**
	 * className to be passed to ActionsDropdown
	 */
	className?: string
}

const IndustriesViewTableActions = memo(({ className, ...industry }: IndustriesViewTableActionsProps) => {
	const { t } = useTranslation("industries", { keyPrefix: "views.industriesView.actions" })

	return (
		<ActionsDropdown className={className}>
			<EditIndustryDialog {...industry}>
				<ActionsDropdown.Item>{t("edit")}</ActionsDropdown.Item>
			</EditIndustryDialog>

			<DeleteIndustryDialog {...industry}>
				<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>
			</DeleteIndustryDialog>
		</ActionsDropdown>
	)
})

IndustriesViewTableActions.displayName = "IndustriesViewTableActions"

export default IndustriesViewTableActions
