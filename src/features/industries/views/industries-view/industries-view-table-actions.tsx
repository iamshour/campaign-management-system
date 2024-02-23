//#region Import
import { memo } from "react"

import DeleteIndustryDialog from "@/features/industries/dialogs/delete-industry-dialog/delete-industry-dialog"
import EditIndustryDialog from "@/features/industries/dialogs/edit-industry-dialog/edit-industry-dialog"
import type { IndustryType } from "@/features/industries/types"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
//#endregion

interface IndustriesViewTableActionsProps extends IndustryType {
	/**
	 * className to be passed to ActionsDropdown
	 */
	className?: string
}

const IndustriesViewTableActions = memo(({ className, ...industry }: IndustriesViewTableActionsProps) => (
	<ActionsDropdown className={className}>
		<EditIndustryDialog {...industry}>
			<ActionsDropdown.Item>Edit</ActionsDropdown.Item>
		</EditIndustryDialog>

		<DeleteIndustryDialog {...industry}>
			<ActionsDropdown.Item>Delete</ActionsDropdown.Item>
		</DeleteIndustryDialog>
	</ActionsDropdown>
))

IndustriesViewTableActions.displayName = "IndustriesViewTableActions"

export default IndustriesViewTableActions
