//#region Import
import { useNavigate } from "react-router-dom"

import DeleteSmsTemplateDialog from "@/features/templates/sms-templates/dialogs/delete-sms-template-dialog/delete-sms-template-dialog"
import type { SmsTemplateType } from "@/features/templates/sms-templates/types"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const SmsTemplatesViewTableActions = ({ id }: Pick<SmsTemplateType, "id">) => {
	const navigate = useNavigate()

	return (
		<Dropdown>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<Dropdown.Item onClick={() => navigate(`new-template?templateId=${id}`)}>Clone</Dropdown.Item>

				<Dropdown.Separator />

				<Dropdown.Item onClick={() => navigate(id)}>View Template</Dropdown.Item>

				<Dropdown.Separator />

				<Dropdown.Item onClick={() => navigate(`${id}/edit-template`)}>Edit</Dropdown.Item>

				<Dropdown.Separator />

				<DeleteSmsTemplateDialog ids={[id]}>
					<Dropdown.Item>Delete</Dropdown.Item>
				</DeleteSmsTemplateDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default SmsTemplatesViewTableActions
