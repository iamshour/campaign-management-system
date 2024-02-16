//#region Import
import { useNavigate } from "react-router-dom"

import DeleteIndustryTemplateDialog from "@/features/industries/dialogs/delete-industry-template-dialog/delete-industry-template-dialog"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const SmsIndustryTemplatesViewTableActions = ({ id }: Pick<SmsIndustryTemplateType, "id">) => {
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

				<DeleteIndustryTemplateDialog ids={[id]}>
					<Dropdown.Item>Delete</Dropdown.Item>
				</DeleteIndustryTemplateDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default SmsIndustryTemplatesViewTableActions
