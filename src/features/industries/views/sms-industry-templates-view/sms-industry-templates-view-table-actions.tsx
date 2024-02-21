//#region Import
import { memo } from "react"
import { useNavigate } from "react-router-dom"

import DeleteIndustryTemplateDialog from "@/features/industries/dialogs/delete-industry-template-dialog/delete-industry-template-dialog"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
//#endregion

const SmsIndustryTemplatesViewTableActions = memo(({ id }: Pick<SmsIndustryTemplateType, "id">) => {
	const navigate = useNavigate()

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item onClick={() => navigate(`new-template?templateId=${id}`)}>Clone</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(id)}>View Template</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(`${id}/edit-template`)}>Edit</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<DeleteIndustryTemplateDialog ids={[id]}>
				<ActionsDropdown.Item>Delete</ActionsDropdown.Item>
			</DeleteIndustryTemplateDialog>
		</ActionsDropdown>
	)
})

SmsIndustryTemplatesViewTableActions.displayName = "SmsIndustryTemplatesViewTableActions"

export default SmsIndustryTemplatesViewTableActions
