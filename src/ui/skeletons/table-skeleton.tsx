import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton/skeleton"

interface TableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Number of columns to be shown in the table. @default 8
	 */
	colsLength?: number

	/**
	 * Number of rowns to be shown in the table. @default 13
	 */
	rowsLength?: number
}

const TableSkeleton = ({ className, colsLength = 8, rowsLength = 13, ...props }: TableSkeletonProps) => (
	<div className={twMerge("flex h-full w-full flex-col gap-2 overflow-hidden px-4", className)} {...props}>
		{Array.from({ length: rowsLength }, (_, i) => (
			<div className='flex h-max w-full gap-2' key={i}>
				{Array.from({ length: colsLength }, (_, i) => (
					<div
						className={"h-[44px] w-full min-w-[120px] max-w-[200px] p-1 first:!min-w-[60px] 2xl:max-w-[300px]"}
						key={i}>
						<Skeleton className='h-full w-full' />
					</div>
				))}
			</div>
		))}
	</div>
)

export default TableSkeleton
