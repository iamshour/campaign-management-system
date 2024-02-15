//#region Import
import { memo, useState } from "react"

import DeleteIndustryDialog from "@/features/industries/dialogs/delete-industry-dialog/delete-industry-dialog"
import EditIndustryDialog from "@/features/industries/dialogs/edit-industry-dialog/edit-industry-dialog"
import type { IndustryType } from "@/features/industries/types"
import { Dropdown } from "@/ui"

//#endregion

interface IndustriesViewTableActionsProps extends IndustryType {
	/**
	 * Icon to be displayed inside trigger button.
	 * It will be three vertical or horizontal dots based on whether the view is list or grid.
	 */
	children: React.ReactNode
}

const IndustriesViewTableActions = memo(({ children, ...industry }: IndustriesViewTableActionsProps) => {
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

	return (
		<Dropdown open={dropDownOpen} onOpenChange={setDropDownOpen}>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				{children}
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
