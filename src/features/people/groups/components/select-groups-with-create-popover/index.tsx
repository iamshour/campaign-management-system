//#region Import
import { twMerge, Popover, PopoverSkeleton } from "@/ui"
import { Suspense, lazy, useState } from "react"
import { useTranslation } from "react-i18next"

import SelectGroupsPopover from "../select-groups-popover"

const CreateGroupContent = lazy(() => import("@/features/people/groups/components/create-group-content"))
//#endregion

type SelectGroupsWithCreatePopover = React.ComponentPropsWithoutRef<typeof SelectGroupsPopover> &
	Required<Pick<React.ComponentPropsWithoutRef<typeof CreateGroupContent>, "onCreateSuccess">>

const SelectGroupsWithCreatePopover = ({ onCreateSuccess, className, ...props }: SelectGroupsWithCreatePopover) => {
	const { t } = useTranslation("groups")
	const [newGroupPopoverOpen, setNewGroupPopoverOpen] = useState(false)

	return (
		<div className={twMerge("relative w-full", className)}>
			<Popover open={newGroupPopoverOpen} onOpenChange={setNewGroupPopoverOpen}>
				<Popover.Trigger className='absolute -top-0.5 end-2 z-10 w-max text-sm font-bold text-primary-500 transition-colors hover:text-primary-800'>
					{t("components.groupsPopover.createNewPopover.title")}
				</Popover.Trigger>
				<Popover.Content side='bottom' align='end' sideOffset={2} alignOffset={-8}>
					<Suspense fallback={<PopoverSkeleton />}>
						<CreateGroupContent
							size='default'
							closePopover={() => setNewGroupPopoverOpen(false)}
							ctaButtonProps={{ size: "sm" }}
							onCreateSuccess={onCreateSuccess}
						/>
					</Suspense>
				</Popover.Content>
			</Popover>

			<SelectGroupsPopover className='' {...props} />
		</div>
	)
}

export default SelectGroupsWithCreatePopover
