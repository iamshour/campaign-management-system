import { Root, Portal, Content, Trigger, type PopoverProps, type PopperContentProps } from "@radix-ui/react-popover"
import { twMerge } from "tailwind-merge"

const Popover = ({ children, ...props }: PopoverProps) => <Root {...props}>{children}</Root>

const PopoverContent = ({ className, align = "center", sideOffset = 4, ...props }: PopperContentProps) => (
	<Portal>
		<Content
			align={align}
			sideOffset={sideOffset}
			className={twMerge(
				"z-50 w-72 overflow-hidden rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className
			)}
			{...props}
		/>
	</Portal>
)

Popover.Trigger = Trigger
Popover.Content = PopoverContent

export default Popover
