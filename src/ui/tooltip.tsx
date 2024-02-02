//#region Import
import {
	Provider,
	Root,
	Trigger,
	Content,
	type TooltipTriggerProps,
	type TooltipProviderProps,
	type TooltipContentProps,
} from "@radix-ui/react-tooltip"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

/**
 * Tooltip Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *				<Tooltip>
 *					<Tooltip.Trigger asChild>
 *						<Button variant=''>
 *							My Custom Button here!
 *						</Button>
 *					</Tooltip.Trigger>
 *					<Tooltip.Content content="Tooltip Content here!" side='right' sideOffset={4} />
 *				</Tooltip>
 * @param props - Tooltip component props
 * @param props.delayDuration - The duration from when the pointer enters the trigger until the tooltip gets opened. @defaultValue 700
 * @param props.skipDelayDuration - How much time a user has to enter another trigger without incurring a delay again. @defaultValue 300
 * @param props.disableHoverableContent - When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. @defaultValue false
 * @param props.children - Tooltip Child components to be used, such as Trigger, Content
 */
const Tooltip = ({ children, ...props }: TooltipProviderProps) => (
	<Provider delayDuration={400} {...props}>
		<Root>{children}</Root>
	</Provider>
)

const TooltipTrigger = forwardRef<React.ElementRef<typeof Trigger>, TooltipTriggerProps>(
	({ className, children, ...props }, ref) => (
		<Trigger ref={ref} {...props} className={twMerge("w-full", className)}>
			{children}
		</Trigger>
	)
)

TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = ({ className, content, ...props }: TooltipContentProps) => (
	<Content
		{...props}
		className={twMerge(
			"z-50 overflow-hidden rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-950 shadow-md prevent-selection animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className
		)}>
		{content}
	</Content>
)

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent

export default Tooltip
