//#region Import
import type { SmsIndustryTemplateType } from "@/features/industries/types"

import DeleteIndustryTemplateDialog from "@/features/industries/dialogs/delete-industry-template-dialog/delete-industry-template-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { memo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
//#endregion

const SmsIndustryTemplatesViewTableActions = memo(({ id }: Pick<SmsIndustryTemplateType, "id">) => {
	const navigate = useNavigate()

	const { pathname } = useLocation()

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item onClick={() => navigate(`new-template?templateId=${id}`)}>Clone</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(id)}>View Template</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(`${id}/edit-template`, { state: { from: pathname } })}>
				Edit
			</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<DeleteIndustryTemplateDialog ids={[id]}>
				<ActionsDropdown.Item>Delete</ActionsDropdown.Item>
			</DeleteIndustryTemplateDialog>
		</ActionsDropdown>
	)
})

SmsIndustryTemplatesViewTableActions.displayName = "SmsIndustryTemplatesViewTableActions"

export default SmsIndustryTemplatesViewTableActions
