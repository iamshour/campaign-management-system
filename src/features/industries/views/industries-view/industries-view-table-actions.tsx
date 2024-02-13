//#region Import
import { memo, useState } from "react"

import EditIndustryDialog from "@/features/industries/dialogs/edit-industry-dialog/edit-industry-dialog"
import type { IndustryType } from "@/features/industries/types"
import { Dropdown } from "@/ui"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const IndustriesViewTableActions = memo((industry: IndustryType) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

	return (
		<Dropdown open={dropDownOpen} onOpenChange={setDropDownOpen}>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<EditIndustryDialog {...industry}>
					<Dropdown.Item>Edit</Dropdown.Item>
				</EditIndustryDialog>

				<Dropdown.Item onClick={() => console.log("Delete Industry with Id: ", industry.id)}>
					<span>Delete</span>
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
})

IndustriesViewTableActions.displayName = "IndustriesViewTableActions"

export default IndustriesViewTableActions
