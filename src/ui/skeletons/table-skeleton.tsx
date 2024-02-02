import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton"

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

const TableSkeleton = ({ colsLength = 8, rowsLength = 13, className, ...props }: TableSkeletonProps) => (
	<div className={twMerge("flex h-full w-full flex-col gap-2 overflow-y-auto px-4", className)} {...props}>
		{Array.from({ length: rowsLength }, (_, i) => (
			<div key={i} className='flex h-max w-full gap-2'>
				{Array.from({ length: colsLength }, (_, i) => (
					<div key={i} className={"h-[44px] w-full p-1 first:!min-w-[60px]"}>
						<Skeleton className='h-full w-full' />
					</div>
				))}
			</div>
		))}
	</div>
)

export default TableSkeleton
