//#region Import
import { Dropdown } from "@/ui"
import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import { DropdownStateContext } from "./dropdown-state-context"
//#endregion

const ActionsDropdown = ({ children, className }: React.ComponentPropsWithoutRef<typeof Dropdown.Trigger>) => {
	const [open, setOpen] = useState(false)

	return (
		<Dropdown onOpenChange={setOpen} open={open}>
			<Dropdown.Trigger className={twMerge("h-max w-max p-1.5", className)} showArrow={false} variant='ghost'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content align='end' sideOffset={0}>
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
