//#region Import
import { useNavigate } from "react-router-dom"

import type { SmsTemplate } from "@/features/templates/sms-templates/types"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const MySmsTemplatesTableActions = ({ id }: Pick<SmsTemplate, "id">) => {
	const navigate = useNavigate()

	return (
		<Dropdown>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<Dropdown.Item onClick={() => navigate(`./${id}`)}>View Template</Dropdown.Item>

				<Dropdown.Separator />

				<Dropdown.Item>Delete</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default MySmsTemplatesTableActions
