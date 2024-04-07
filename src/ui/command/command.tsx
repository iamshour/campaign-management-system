//#region Import
import type { DialogProps } from "@radix-ui/react-dialog"

import TablerSearch from "~icons/tabler/search"
import { CommandLoading, Command as CommandPrimitive } from "cmdk"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import Dialog from "../dialog/dialog"
//#endregion

/**
 * Command Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *      <Command>
 *       </Command>
 *
 * @param props - Command component props
 * @param props.children - Command Child Components to be used, such as Dialog, Input, List, Empty, Group, Separator, Item, Shortcut
 */
const Command = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => (
	<CommandPrimitive
		className={twMerge("flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-slate-950", className)}
		{...props}
	/>
)

const CommandDialog = ({ children, ...props }: DialogProps) => (
	<Dialog {...props}>
		<Dialog.Content className='overflow-hidden p-0 shadow-lg'>
			<Command
				className={`[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 
			[&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 
			[&_[cmdk-item]_svg]:w-5`}>
				{children}
			</Command>
		</Dialog.Content>
	</Dialog>
)

const CommandInput = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ children, className, ...props }, ref) => (
	<div className='group relative flex h-max w-full items-center' ref={ref}>
		<TablerSearch className='pointer-events-none absolute inset-y-1/2 start-3 h-4 w-4 shrink-0 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-600' />
		<CommandPrimitive.Input
			className={twMerge(
				`flex w-full flex-1 border-0 !border-b !border-b-gray-300 bg-transparent py-3 !ps-10 text-sm !outline-0 !ring-0 placeholder:text-gray-500 autofill:shadow-[0_0_0_30px_white_inset]
				 disabled:cursor-not-allowed disabled:opacity-50`,
				className
			)}
			{...props}
		/>
		{children}
	</div>
))

CommandInput.displayName = "CommandInput"

const CommandList = forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.List
		className={twMerge("max-h-[250px] overflow-y-auto overflow-x-hidden", className)}
		ref={ref}
		{...props}
	/>
))

CommandList.displayName = "CommandList"

const CommandEmpty = (props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>) => (
	<CommandPrimitive.Empty className='py-6 text-center text-sm' {...props} />
)

const CommandGroup = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Group
		className={twMerge(
			`overflow-hidden p-1 text-slate-950 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium
			 [&_[cmdk-group-heading]]:text-slate-500`,
			className
		)}
		ref={ref}
		{...props}
	/>
))

CommandGroup.displayName = "CommandGroup"

const CommandSeparator = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>) => (
	<CommandPrimitive.Separator className={twMerge("-mx-1 h-px bg-slate-200", className)} {...props} />
)

const CommandItem = ({
	className,
	disabled,
	...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>) => (
	<CommandPrimitive.Item
		className={twMerge(
			`relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-all aria-selected:bg-slate-100 aria-selected:text-slate-900
			 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50`,
			className
		)}
		data-disabled={disabled}
		{...props}
	/>
)

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
	<span className={twMerge("ms-auto text-xs tracking-widest text-slate-500", className)} {...props} />
)

Command.Dialog = CommandDialog
Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Separator = CommandSeparator
Command.Item = CommandItem
Command.Shortcut = CommandShortcut
Command.Loading = CommandLoading

export default Command
