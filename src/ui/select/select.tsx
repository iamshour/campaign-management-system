//#region Import
import {
	Root,
	Trigger,
	Content,
	Label,
	Item,
	Separator,
	Value,
	Viewport,
	Portal,
	ItemIndicator,
	ItemText,
	Group,
	type SelectProps as DefaultSelectProps,
	type SelectValueProps,
	type SelectLabelProps,
	type SelectItemProps,
	type SelectSeparatorProps,
	type SelectContentProps,
} from "@radix-ui/react-select"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"

import LucideCheck from "~icons/lucide/check"
import LucideChevronDown from "~icons/lucide/chevron-down"
//#endregion

// Fixing value type below for the onValueChange callback so that the paramter takes the same type as the passed value
type SelectProps<ValueType extends string> = Omit<DefaultSelectProps, "value" | "onValueChange"> & {
	value?: ValueType
	onValueChange?: (v: ValueType) => void
}

/**
 * Select Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 * <Select
 *		value={String(limit)}
 *		onValueChange={(limit) => updatePagination(0, Number(limit))} >
 *		<Select.Trigger className="w-[80px] h-max">
 *			<Select.Value />
 *		</Select.Trigger>
 *		<Select.Content>
 *			{pageLimits?.map((pageSize, idx) => (
 *				<Select.Item value={pageSize} key={pageSize + idx}>
 *					<Select.Text>{pageSize}</Select.Text>
 *				</Select.Item>
 *			))}
 *		</Select.Content>
 *	</Select>
 *
 * @param props - Select component props
 * @param props.value - Selected Value (Optional)
 * @param props.defaultValue - Default Selected Value (Optional)
 * @param props.onValueChange - Function that updates Selected Value, taking the new selected value as param (Optional)
 * @param props.open - Boolean for rendering Popper component (controlled component) (Optional)
 * @param props.defaultOpen - Default State of Popper component, whether open by default or closed (Optional)
 * @param props.onOpenChange - Function to be used when Popper component is open (Optional)
 * @param props.dir - Direction of component: "ltr" or "rtl", useful for localication (Optional)
 * @param props.name - Name used for controlled component, useful in forms (Optional)
 * @param props.autoComplete - "on" or "off" For triggering Auto-completion (Optional)
 * @param props.disabled - Boolean for disabling component (Optional)
 * @param props.required - Boolean for requiring component, useful in forms (Optional)
 * @param props.children - Components to be used inside Select, such as Trigger, Value, Content, Item, Label, Separator
 */
function Select<ValueType extends string>(props: SelectProps<ValueType>) {
	return <Root {...props} />
}

const SelectTrigger = ({
	className,
	children,
	showArrow = true,
	...props
}: React.ComponentPropsWithoutRef<typeof Button> & { showArrow?: boolean }) => (
	<Trigger asChild>
		<Button
			variant='outline-grey'
			className={twMerge(
				`group justify-between text-opacity-90 [&>span]:inline [&>span]:flex-1 [&>span]:truncate [&>span]:text-start`,
				className
			)}
			{...props}>
			{children}
			{showArrow && <LucideChevronDown className='h-4 w-4 shrink-0 text-gray-500 group-hover:text-primary-800' />}
		</Button>
	</Trigger>
)
const SelectValue = ({ placeholder, ...props }: SelectValueProps) => {
	const { t } = useTranslation("ui")
	return <Value {...props} placeholder={placeholder || t("select.placeholder")} />
}

const SelectContent = ({
	children,
	className,
	side = "bottom",
	sideOffset = 4,
	position = "popper",
	...props
}: SelectContentProps) => (
	<Portal>
		<Content
			{...props}
			className={twMerge(
				"relative z-50 max-h-[220px] min-w-[var(--radix-select-trigger-width)] overflow-y-auto overflow-x-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				"duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
				position === "popper" &&
					"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
				className
			)}
			position={position}
			side={side}
			sideOffset={sideOffset}>
			<Viewport className={twMerge("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full")}>
				{children}
			</Viewport>
		</Content>
	</Portal>
)

const SelectItem = ({ className, children, showCheck = true, ...props }: SelectItemProps & { showCheck?: boolean }) => (
	<Item
		className={twMerge(
			"relative flex w-full cursor-default select-none items-center justify-start gap-1 rounded-sm p-1.5 text-sm outline-none transition-basic data-[disabled]:pointer-events-none data-[state=checked]:!bg-primary-50/80 data-[disabled]:opacity-50 focus:bg-slate-100 focus:text-slate-900",
			className
		)}
		{...props}>
		{children}
		{showCheck && (
			<ItemIndicator className='flex h-max w-max flex-1 justify-end text-primary-800'>
				<LucideCheck className='h-4 w-4' />
			</ItemIndicator>
		)}
	</Item>
)

const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
	<Label className={twMerge("py-1.5 pe-2 ps-8 text-sm font-semibold", className)} {...props} />
)

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => (
	<Separator className={twMerge("-mx-1 my-1 h-px bg-slate-100", className)} {...props} />
)

Select.Trigger = SelectTrigger
Select.Value = SelectValue
Select.Content = SelectContent
Select.Item = SelectItem
Select.Label = SelectLabel
Select.Separator = SelectSeparator
Select.Group = Group
Select.Text = ItemText

export default Select
