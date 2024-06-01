//#region Import
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"

import DeleteSmsTemplateDialog from "@/features/templates/sms-templates/dialogs/delete-sms-template-dialog/delete-sms-template-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useNavigate } from "react-router-dom"
//#endregion

const SmsTemplatesViewTableActions = ({ id }: Pick<SmsTemplateType, "id">) => {
	const navigate = useNavigate()

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item onClick={() => navigate(`new-template?templateId=${id}`)}>Clone</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(id)}>View Template</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(`${id}/edit-template`)}>Edit</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<DeleteSmsTemplateDialog ids={[id]}>
				<ActionsDropdown.Item>Delete</ActionsDropdown.Item>
			</DeleteSmsTemplateDialog>
		</ActionsDropdown>
	)
}

export default SmsTemplatesViewTableActions
