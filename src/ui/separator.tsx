import { Root, type SeparatorProps } from "@radix-ui/react-separator"
import { twMerge } from "tailwind-merge"

const Separator = ({ className, orientation = "horizontal", decorative = true, ...props }: SeparatorProps) => (
	<Root
		{...props}
		decorative={decorative}
		orientation={orientation}
		className={twMerge(
			"shrink-0 rounded bg-slate-200",
			orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
			className
		)}
	/>
)

export default Separator
