//#region Import
import { Suspense, lazy, useState } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import { Popover, PopoverSkeleton } from "@/ui"

import SelectGroupsPopover from "./select-groups-popover"

const CreateGroupContent = lazy(
	() => import("@/features/people/groups/dialogs/create-group-dialog/create-group-content")
)
//#endregion

type SelectGroupsWithCreatePopover = React.ComponentPropsWithoutRef<typeof SelectGroupsPopover> &
	Required<Pick<React.ComponentPropsWithoutRef<typeof CreateGroupContent>, "onCreateSuccess">>

const SelectGroupsWithCreatePopover = ({ onCreateSuccess, className, ...props }: SelectGroupsWithCreatePopover) => {
	const { t } = useTranslation("groups")
	const [popoverOpen, setPopoverOpen] = useState(false)

	return (
		<div className={twMerge("relative w-full", className)}>
			<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
				<Popover.Trigger className='absolute -top-0.5 end-2 z-10 w-max text-sm font-bold text-primary-500 transition-colors hover:text-primary-800'>
					{t("components.groupsPopover.createNewPopover.title")}
				</Popover.Trigger>
				<Popover.Content side='bottom' align='end' sideOffset={2} alignOffset={-8}>
					<Suspense fallback={<PopoverSkeleton />}>
						<CreateGroupContent
							closeDialog={() => setPopoverOpen(false)}
							onCreateSuccess={onCreateSuccess}
							ctaProps={{ variant: "secondary", size: "sm" }}
						/>
					</Suspense>
				</Popover.Content>
			</Popover>

			<SelectGroupsPopover {...props} />
		</div>
	)
}

export default SelectGroupsWithCreatePopover
