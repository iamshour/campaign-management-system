//#region Import
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import { Dropdown } from "@/ui"

import { DropdownStateContext } from "./dropdown-state-context"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

const ActionsDropdown = ({ children, className }: React.ComponentPropsWithoutRef<typeof Dropdown.Trigger>) => {
	const [open, setOpen] = useState(false)

	return (
		<Dropdown open={open} onOpenChange={setOpen}>
			<Dropdown.Trigger showArrow={false} variant='ghost' className={twMerge("h-max w-max p-1.5", className)}>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<DropdownStateContext.Provider value={{ closeDropdown: () => setOpen(false) }}>
					{children}
				</DropdownStateContext.Provider>
			</Dropdown.Content>
		</Dropdown>
	)
}

ActionsDropdown.Item = Dropdown.Item
ActionsDropdown.Separator = Dropdown.Separator

export default ActionsDropdown
