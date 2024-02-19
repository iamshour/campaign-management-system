//#region Import
import {
	Root,
	CollapsibleTrigger as Trigger,
	CollapsibleContent as Content,
	type CollapsibleProps,
	type CollapsibleContentProps,
	type CollapsibleTriggerProps,
} from "@radix-ui/react-collapsible"
import { twMerge } from "tailwind-merge"

import LucideChevronDown from "~icons/lucide/chevron-down"
//#endregion

/**
 * Collapsible Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 * 					<Collapsible>
 *						<Collapsible.Trigger showArrow>
 *								Trigger Collapsible here!
 *							</Collapsible.Trigger>
 *							<Collapsible.Content className='ms-5'>
 *								My Content hereee...
 *							</Collapsible.Content>
 *					</Collapsible>
 * @param props - Collapsible component props
 * @param props.children - Collapsible Child Components to be used, such as Trigger, Content
 * @param props.open - Optional Boolean to use for a Controlled Dialog
 * @param props.defaultOpen - Default State of Dialog, whether open by default or closed
 * @param props.onOpenChange - Optional function to use to trigger Dialog's presence in a controlled component
 * @param props.disabled - Boolean for disabling component (Optional)
 */
const Collapsible = ({ className, ...props }: CollapsibleProps) => (
	<Root className={twMerge("h-max", className)} {...props} />
)

const CollapsibleTrigger = ({
	className,
	children,
	showArrow,
	...props
}: CollapsibleTriggerProps & { showArrow?: boolean }) => (
	<Trigger
		{...props}
		className={twMerge(
			"flex h-max w-full items-center justify-between gap-2 whitespace-nowrap [&_svg]:shrink-0",
			showArrow && "[&[data-state=open]>[data-element='arrow']]:rotate-180",
			className
		)}>
		{children}
		{showArrow && (
			<LucideChevronDown data-element='arrow' className='h-4 w-4 shrink-0 transition-transform duration-300' />
		)}
	</Trigger>
)

const CollapsibleContent = ({
	className,
	children,
	orientation = "vertical",
	...props
}: CollapsibleContentProps & { orientation?: "vertical" | "horizontal" }) => (
	<Content
		{...props}
		className={twMerge(
			"overflow-hidden transition-all",
			orientation === "vertical" && "data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down",
			orientation === "horizontal" &&
				"data-[state=closed]:animate-collapse-x-close data-[state=open]:animate-collapse-x-open",
			className
		)}>
		{children}
	</Content>
)

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export default Collapsible
