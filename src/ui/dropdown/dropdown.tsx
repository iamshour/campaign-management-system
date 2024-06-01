//#region Import
import {
	Arrow,
	CheckboxItem,
	Content,
	type DropdownMenuCheckboxItemProps,
	type DropdownMenuContentProps,
	type DropdownMenuItemProps,
	type DropdownMenuLabelProps,
	type DropdownMenuProps,
	type DropdownMenuRadioItemProps,
	type DropdownMenuSeparatorProps,
	type DropdownMenuSubContentProps,
	type DropdownMenuSubTriggerProps,
	Group,
	Item,
	ItemIndicator,
	Label,
	Portal,
	RadioGroup,
	RadioItem,
	Root,
	Separator,
	Sub,
	SubContent,
	SubTrigger,
	Trigger,
} from "@radix-ui/react-dropdown-menu"
import LucideCheck from "~icons/lucide/check"
import LucideChevronDown from "~icons/lucide/chevron-down"
import LucideChevronRight from "~icons/lucide/chevron-right"
import LucideCircle from "~icons/lucide/circle"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import Button from "../button/button"
//#endregion

type InsetProp = { inset?: boolean }

/**
 * Dropdown Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 * 		<Dropdown>
 *			   <Dropdown.Trigger variant="" className="w-[200px]">
 *				   <div>My custom trigger</div>
 *			   </Dropdown.Trigger>
 *			   <Dropdown.Content>
 *			      <Dropdown.Item>
 *			         <span>Profile</span>
 *			      <Dropdown.Shortcut>⇧⌘P</Dropdown.Shortcut>
 *			      </Dropdown.Item>
 *			      <Dropdown.Separator />
 *			      <Dropdown.Item>
 *			         <span>Logout</span>
 *			         <Dropdown.Shortcut>⇧⌘L</Dropdown.Shortcut>
 *			      </Dropdown.Item>
 *				</Dropdown.Content>
 *		</Dropdown>
 * @param props - Dropdown component props
 * @param props.dir - Direction of dropdown component: "ltr" or "rtl", used for localication
 * @param props.open - Optional Boolean for rendering dropdown content (controlled component)
 * @param props.defaultOpen - Default State of Dropdown Menu, whether open by default or closed
 * @param props.onOpenChange - Function to be used to trigger Dropdown Menu (controlled component)
 * @param props.modal - Boolean whether Dropdown is triggered in a modal
 * @param props.children - Dropdown Child components to be used, such as Trigger, SubTrigger, Content,
 * 							SubContent, Item, CheckboxItem, RadioItem, Label, Separator, Shortcut, Arrow, Group, RadioGroup, Sub
 */
const Dropdown = (props: DropdownMenuProps) => <Root {...props} />

const DropdownTrigger = ({
	children,
	showArrow = true,
	...props
}: React.ComponentPropsWithoutRef<typeof Button> & { showArrow?: boolean }) => (
	<Trigger asChild>
		<Button {...props}>
			{children}
			{showArrow && <LucideChevronDown className='ms-2 text-sm' />}
		</Button>
	</Trigger>
)

const DropdownSubTrigger = ({ children, className, inset, ...props }: DropdownMenuSubTriggerProps & InsetProp) => (
	<SubTrigger
		className={twMerge(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-slate-100 focus:bg-slate-100",
			inset && "ps-8",
			className
		)}
		{...props}>
		{children}
		<LucideChevronRight className='ms-auto h-4 w-4' />
	</SubTrigger>
)

const DropdownContent = ({ children, ...props }: DropdownMenuContentProps) => (
	<Portal>
		<Content
			{...props}
			className={twMerge(
				`z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md data-[state=open]:animate-in
				 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
				  data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
				props?.className
			)}
			sideOffset={props?.sideOffset || 4}>
			{children}
		</Content>
	</Portal>
)

const DropdownSubContent = ({ className, ...props }: DropdownMenuSubContentProps) => (
	<SubContent
		className={twMerge(
			`z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out
			 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 
			 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
			className
		)}
		{...props}
	/>
)

const DropdownItem = forwardRef<
	React.ElementRef<typeof Item>,
	DropdownMenuItemProps & InsetProp & { active?: boolean }
>(({ active, className, inset, onSelect, ...props }, ref) => (
	<Item
		className={twMerge(
			`relative flex cursor-pointer select-none items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[active=true]:pointer-events-none 
			data-[disabled]:pointer-events-none data-[active=true]:bg-primary-50/80 data-[disabled]:opacity-50 focus:bg-slate-100 focus:text-slate-900`,
			inset && "ps-8",
			className
		)}
		data-active={active}
		onSelect={(event) => {
			event.preventDefault()
			onSelect && onSelect(event)
		}}
		ref={ref}
		{...props}
	/>
))

DropdownItem.displayName = "DropdownItem"

const DropdownCheckboxItem = ({ checked, children, className, ...props }: DropdownMenuCheckboxItemProps) => (
	<CheckboxItem
		checked={checked}
		className={twMerge(
			`relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none
			 data-[disabled]:opacity-50 focus:bg-slate-100 focus:text-slate-900`,
			className
		)}
		{...props}>
		<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
			<ItemIndicator>
				<LucideCheck className='h-4 w-4' />
			</ItemIndicator>
		</span>
		{children}
	</CheckboxItem>
)

const DropdownRadioItem = ({ children, className, ...props }: DropdownMenuRadioItemProps) => (
	<RadioItem
		className={twMerge(
			`relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none
			 data-[disabled]:opacity-50 focus:bg-slate-100 focus:text-slate-900`,
			className
		)}
		{...props}>
		<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
			<ItemIndicator>
				<LucideCircle className='h-2 w-2 fill-current' />
			</ItemIndicator>
		</span>
		{children}
	</RadioItem>
)

const DropdownLabel = ({ className, inset, ...props }: DropdownMenuLabelProps & InsetProp) => (
	<Label className={twMerge("px-2 py-1.5 text-sm font-semibold", inset && "ps-8", className)} {...props} />
)

const DropdownSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => (
	<Separator className={twMerge("-mx-1 my-1 h-px bg-slate-100", className)} {...props} />
)

const DropdownShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	return <span className={twMerge("ms-auto text-xs tracking-widest opacity-60", className)} {...props} />
}

Dropdown.Trigger = DropdownTrigger
Dropdown.SubTrigger = DropdownSubTrigger
Dropdown.Content = DropdownContent
Dropdown.SubContent = DropdownSubContent
Dropdown.Item = DropdownItem
Dropdown.CheckboxItem = DropdownCheckboxItem
Dropdown.RadioItem = DropdownRadioItem
Dropdown.Label = DropdownLabel
Dropdown.Separator = DropdownSeparator
Dropdown.Shortcut = DropdownShortcut
Dropdown.Arrow = Arrow
Dropdown.Group = Group
Dropdown.RadioGroup = RadioGroup
Dropdown.Sub = Sub

export default Dropdown
