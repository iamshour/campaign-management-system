//#region Import
import {
	Content,
	Provider,
	Root,
	type TooltipContentProps,
	type TooltipProviderProps,
	Trigger,
} from "@radix-ui/react-tooltip"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

interface TooltipProps
	extends Pick<TooltipProviderProps, "delayDuration" | "disableHoverableContent" | "skipDelayDuration">,
		TooltipContentProps {}

/**
 * Tooltip Component
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *				<Tooltip content="Tooltip Content here!" side='right' sideOffset={4}>
 *					<Button>
 *						My Custom Button here!
 *					</Button>
 *				</Tooltip>
 *
 * @param props - Tooltip Content Props component props
 * @param props.delayDuration - The duration from when the pointer enters the trigger until the tooltip gets opened. @defaultValue 700
 * @param props.skipDelayDuration - How much time a user has to enter another trigger without incurring a delay again. @defaultValue 300
 * @param props.disableHoverableContent - When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. @defaultValue false
 * @param props.content - Content To be displayed inside a Tooltip component
 * @param props.children - Tooltip Child components to be used, such as Trigger, Content
 */
const Tooltip = forwardRef<React.ElementRef<typeof Trigger>, TooltipProps>(
	({ children, className, content, delayDuration, disableHoverableContent, skipDelayDuration, ...props }, ref) => (
		<Provider
			delayDuration={delayDuration || 400}
			disableHoverableContent={disableHoverableContent}
			skipDelayDuration={skipDelayDuration}>
			<Root>
				<Trigger asChild ref={ref}>
					{children}
				</Trigger>

				<Content
					{...props}
					className={twMerge(
						`z-50 overflow-hidden rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-950 shadow-md prevent-selection animate-in fade-in-0 zoom-in-95
					data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
					data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
						className
					)}>
					{content}
				</Content>
			</Root>
		</Provider>
	)
)

Tooltip.displayName = "Tooltip"

export default Tooltip
