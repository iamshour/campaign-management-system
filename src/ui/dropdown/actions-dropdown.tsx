//#region Import
import { Dropdown, IconType } from "@/ui"
import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import { DropdownStateContext } from "./dropdown-state-context"
//#endregion

type ActionsDropdownProps = React.ComponentPropsWithoutRef<typeof Dropdown.Trigger> & {
	Icon?: IconType
	iconClassName?: string
}

const ActionsDropdown = ({ children, className, Icon = BiThreeDotsVertical, iconClassName }: ActionsDropdownProps) => {
	const [open, setOpen] = useState(false)

	return (
		<Dropdown modal={false} onOpenChange={setOpen} open={open}>
			<Dropdown.Trigger
				className={twMerge("h-max w-max p-1.5 text-[#939393] hover:text-[#2DAEF5]", className)}
				showArrow={false}
				variant='ghost'>
				<Icon className={iconClassName} />
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
