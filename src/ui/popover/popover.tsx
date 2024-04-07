//#region Import
import { Content, type PopoverProps, type PopperContentProps, Portal, Root, Trigger } from "@radix-ui/react-popover"
import { Suspense } from "react"
import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton/skeleton"
//#endregion

const Popover = ({ children, ...props }: PopoverProps) => <Root {...props}>{children}</Root>

const PopoverContent = ({
	align = "center",
	children,
	className,
	sideOffset = 4,
	skeletonClassName,
	...props
}: PopperContentProps & { skeletonClassName?: string }) => (
	<Portal>
		<Content
			align={align}
			className={twMerge(
				`z-50 w-72 overflow-hidden rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md outline-none flex-center data-[state=open]:animate-in
				 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
				  data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
				className
			)}
			sideOffset={sideOffset}
			{...props}>
			<Suspense fallback={<Skeleton className={twMerge("h-[95%] w-[95%]", skeletonClassName)} />}>{children}</Suspense>
		</Content>
	</Portal>
)

Popover.Trigger = Trigger
Popover.Content = PopoverContent

export default Popover
