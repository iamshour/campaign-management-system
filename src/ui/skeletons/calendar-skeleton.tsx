import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton"

const CalendarSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={twMerge("grid h-[350px] w-[544px] grid-cols-2 gap-4 p-4", className)} {...props}>
		<div className='w-/1/2 flex h-full flex-col gap-4'>
			<Skeleton className='h-[56px] w-full' />
			<Skeleton className='h-full w-full flex-1' />
		</div>
		<div className='w-/1/2 flex h-full flex-col gap-4'>
			<Skeleton className='h-[56px] w-full' />
			<Skeleton className='h-full w-full flex-1' />
		</div>
	</div>
)

export default CalendarSkeleton
