//#region Import
import LucideChevronDown from "~icons/lucide/chevron-down"
import { createContext, useContext } from "react"
import { twMerge } from "tailwind-merge"

import type { OptionType } from "../../types"

import Badge from "../../badge/badge"
import Button from "../../button/button"
import Label from "../../label/label"
import Popover from "../../popover/popover"
import MultiBadegesPreview from "./multi-badges-preview"
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

type SelectAsyncOptionsPopoverContextType = {
	creatable?: boolean
} & (PopoverMultiProps | PopoverSingleProps)

const SelectAsyncOptionsPopoverProvider = createContext<SelectAsyncOptionsPopoverContextType>(
	{} as SelectAsyncOptionsPopoverContextType
)

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectAsyncOptionsPopover = () => useContext(SelectAsyncOptionsPopoverProvider)

type SelectAsyncOptionsPopoverProps = Pick<
	React.ComponentPropsWithoutRef<typeof Button>,
	"aria-invalid" | "children" | "className" | "disabled" | "size"
> & {
	contentProps?: React.ComponentPropsWithoutRef<typeof Popover.Content>
	label?: string
	placeholder?: string
	triggerProps?: React.ComponentPropsWithoutRef<typeof Button>
} & SelectAsyncOptionsPopoverContextType

const SelectAsyncOptionsPopover = ({
	"aria-invalid": invalid,
	children,
	className,
	contentProps,
	disabled,
	label,
	placeholder,
	size,
	triggerProps,
	...contextValue
}: SelectAsyncOptionsPopoverProps) => {
	const { isMulti, selection } = contextValue

	return (
		<SelectAsyncOptionsPopoverProvider.Provider value={contextValue}>
			<div className={twMerge("relative w-full max-w-[340px]", className)}>
				{!!label?.length && (
					<Label aria-invalid={invalid} disabled={disabled} size={size}>
						{label}
					</Label>
				)}

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
									{(isMulti && !selection?.length) || (!isMulti && !selection?.value?.length) ? (
										placeholder || isMulti ? (
											"Select Options"
										) : (
											"Select an Option"
										)
									) : isMulti ? (
										<MultiBadegesPreview selection={selection} size={size} />
									) : (
										<Badge size={size}>{selection?.label}</Badge>
									)}
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
			</div>
		</SelectAsyncOptionsPopoverProvider.Provider>
	)
}

export default SelectAsyncOptionsPopover
