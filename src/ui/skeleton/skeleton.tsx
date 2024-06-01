//#region Import
import { twMerge } from "tailwind-merge"
//#endregion

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div {...props} className={twMerge("animate-pulse rounded-md bg-slate-100", className)} />
)

export default Skeleton
