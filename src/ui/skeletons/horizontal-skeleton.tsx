import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton"

const HorizontalSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("flex min-h-[72px] w-full items-center justify-between gap-4 p-3.5", className)} {...props}>
		<Skeleton className='h-[40px] w-1/3' />
		<Skeleton className='h-[40px] w-1/3' />
	</div>
)

export default HorizontalSkeleton
