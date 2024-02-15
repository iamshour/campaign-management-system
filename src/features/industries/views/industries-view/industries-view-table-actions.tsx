//#region Import
import { memo, useState } from "react"

import DeleteIndustryDialog from "@/features/industries/dialogs/delete-industry-dialog/delete-industry-dialog"
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

				<DeleteIndustryDialog {...industry}>
					<Dropdown.Item>Delete</Dropdown.Item>
				</DeleteIndustryDialog>
			</Dropdown.Content>
		</Dropdown>
	)
})

IndustriesViewTableActions.displayName = "IndustriesViewTableActions"

export default IndustriesViewTableActions
