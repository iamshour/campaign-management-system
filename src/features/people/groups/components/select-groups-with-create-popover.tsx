//#region Import
import { Popover } from "@/ui"
import { lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import SelectGroupsPopover from "./select-groups-popover/select-groups-popover"

const CreateGroupContent = lazy(
	() => import("@/features/people/groups/dialogs/create-group-dialog/create-group-content")
)
//#endregion

type SelectGroupsWithCreatePopover = React.ComponentPropsWithoutRef<typeof SelectGroupsPopover> &
	Required<Pick<React.ComponentPropsWithoutRef<typeof CreateGroupContent>, "onCreateSuccess">>

const SelectGroupsWithCreatePopover = ({ className, onCreateSuccess, ...props }: SelectGroupsWithCreatePopover) => {
	const { t } = useTranslation("groups")

	const [popoverOpen, setPopoverOpen] = useState(false)

	return (
		<div className={twMerge("relative w-full", className)}>
			<Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
				<Popover.Trigger className='absolute -top-0.5 end-2 z-10 w-max text-sm font-bold text-primary-500 transition-colors hover:text-primary-800'>
					{t("components.groupsPopover.createNewPopover.title")}
				</Popover.Trigger>
				<Popover.Content align='end' alignOffset={-8} className='p-2' side='bottom' sideOffset={2}>
					<CreateGroupContent
						closeDialog={() => setPopoverOpen(false)}
						ctaProps={{ size: "sm", variant: "secondary" }}
						onCreateSuccess={onCreateSuccess}
					/>
				</Popover.Content>
			</Popover>

			<SelectGroupsPopover {...props} />
		</div>
	)
}

export default SelectGroupsWithCreatePopover
