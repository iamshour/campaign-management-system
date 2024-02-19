import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton/skeleton"

const PopoverSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("flex h-[196px] w-[288px] max-w-full flex-col justify-evenly gap-4", className)} {...props}>
		<Skeleton className='w-full flex-1' />
		<Skeleton className='w-full flex-1' />
		<Skeleton className='w-full flex-1' />
	</div>
)

export default PopoverSkeleton
