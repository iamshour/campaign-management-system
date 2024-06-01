//#region Import
import { Root, type SeparatorProps } from "@radix-ui/react-separator"
import { twMerge } from "tailwind-merge"
//#endregion

const Separator = ({ className, decorative = true, orientation = "horizontal", ...props }: SeparatorProps) => (
	<Root
		{...props}
		className={twMerge(
			"shrink-0 rounded bg-slate-200",
			orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
			className
		)}
		decorative={decorative}
		orientation={orientation}
	/>
)

export default Separator
