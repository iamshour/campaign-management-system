//#region Import
import { memo, useState } from "react"

import type { IndustryType } from "@/features/industries/types"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const IndustriesViewTableActions = memo(({ id }: Pick<IndustryType, "id">) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

	return (
		<Dropdown open={dropDownOpen} onOpenChange={setDropDownOpen}>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<Dropdown.Item onClick={() => console.log("Edit Industry with Id: ", id)}>
					<span>Edit</span>
				</Dropdown.Item>

				<Dropdown.Item onClick={() => console.log("Delete Industry with Id: ", id)}>
					<span>Delete</span>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
})

IndustriesViewTableActions.displayName = "IndustriesViewTableActions"

export default IndustriesViewTableActions
