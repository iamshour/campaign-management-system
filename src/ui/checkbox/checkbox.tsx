//#region Import
import { Root, Indicator } from "@radix-ui/react-checkbox"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import LucideCheck from "~icons/lucide/check"
//#endregion

const Checkbox = forwardRef<React.ElementRef<typeof Root>, React.ComponentPropsWithoutRef<typeof Root>>(
	({ className, ...props }, ref) => (
		<Root
			ref={ref}
			{...props}
			className={twMerge(
				"peer h-5 w-5 shrink-0 rounded-[4px] border border-slate-300/80 ring-offset-white !duration-150 transition-basic data-[state=checked]:bg-primary-900 data-[state=checked]:text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}>
			<Indicator className={twMerge("text-current flex-center")}>
				<LucideCheck className='text-sm' />
			</Indicator>
		</Root>
	)
)
Checkbox.displayName = Root.displayName

export default Checkbox
