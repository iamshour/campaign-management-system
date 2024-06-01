//#region Import
import type { OptionType } from "@/ui/types"

import Badge from "@/ui/badge/badge"
import LucideChevronDown from "~icons/lucide/chevron-down"
import { createContext, useContext } from "react"
import { twMerge } from "tailwind-merge"

import Button from "../../button/button"
import Popover from "../../popover/popover"
import { CommonSelectPopoverProps } from "../types"
import MultiBadgesPreview from "./multi-badges-preview"
//#endregion

type PopoverSingleProps = {
	isMulti?: false
	maxLimit?: undefined
	selection?: OptionType
	updateSelection: (option?: OptionType) => void
}
type PopoverMultiProps = {
	isMulti: true
	maxLimit?: number
	selection: OptionType[]
	updateSelection: (option: OptionType[]) => void
}

type SelectAsyncPopoverContextType = {
	creatable?: boolean
} & (PopoverMultiProps | PopoverSingleProps)

const SelectAsyncPopoverProvider = createContext<SelectAsyncPopoverContextType>({} as SelectAsyncPopoverContextType)

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectAsyncPopover = () => useContext(SelectAsyncPopoverProvider)

type SelectAsyncPopoverProps = CommonSelectPopoverProps &
	Pick<React.ComponentPropsWithoutRef<typeof Button>, "children" | "disabled"> &
	SelectAsyncPopoverContextType

const SelectAsyncPopover = ({
	"aria-invalid": invalid,
	children,
	contentProps,
	disabled,
	placeholder,
	size,
	triggerProps,
	...contextValue
}: SelectAsyncPopoverProps) => {
	const { isMulti, selection } = contextValue

	return (
		<SelectAsyncPopoverProvider.Provider value={contextValue}>
			<Popover>
				<Popover.Trigger asChild disabled={disabled}>
					<Button
						aria-invalid={invalid}
						hasValue={(isMulti && !!selection?.length) || (!isMulti && !!selection?.value?.length)}
						size={size}
						variant='outline-grey'
						{...triggerProps}
						className={twMerge(
							"w-full justify-between overflow-hidden py-0 !font-normal",
							size === "lg" ? "text-base" : "px-3 text-sm",
							triggerProps?.className
						)}>
						<div className='h-full flex-1 truncate py-2.5 text-start'>
							<div className='flex h-full items-center gap-1'>
								<SelectAsyncPopoverTriggerContent placeholder={placeholder} size={size} />
							</div>
						</div>

						<LucideChevronDown className='h-4 w-4' />
					</Button>
				</Popover.Trigger>

				<Popover.Content
					align='start'
					{...contentProps}
					className={twMerge("h-[250px] w-[300px] border border-gray-300 p-0 flex-center", contentProps?.className)}>
					{children}
				</Popover.Content>
			</Popover>
		</SelectAsyncPopoverProvider.Provider>
	)
}

export default SelectAsyncPopover

const SelectAsyncPopoverTriggerContent = ({
	placeholder,
	size,
}: Pick<SelectAsyncPopoverProps, "placeholder" | "size">) => {
	const { isMulti, selection } = useSelectAsyncPopover()

	if (isMulti) return <MultiBadgesPreview placeholder={placeholder} selection={selection} size={size} />

	if (!selection?.value?.length) return placeholder || "Select an option"

	return <Badge size={size}>{selection?.label}</Badge>
}
