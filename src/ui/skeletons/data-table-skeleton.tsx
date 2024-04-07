//#region Import
import Skeleton from "../skeleton/skeleton"
import TableSkeleton from "./table-skeleton"
//#endregion

const DataTableSkeleton = ({
	colsLength,
	rowsLength,
}: Pick<React.ComponentPropsWithoutRef<typeof TableSkeleton>, "colsLength" | "rowsLength">) => (
	<div className='flex h-full w-full flex-col gap-4'>
		<div className='flex h-[72px] w-full items-center justify-between gap-4 p-3.5'>
			<Skeleton className='h-full w-1/3' />
			<Skeleton className='h-full w-1/3' />
		</div>
		<TableSkeleton className='flex-1' colsLength={colsLength} rowsLength={rowsLength} />
		<div className='flex h-[72px] w-full justify-between p-3.5'>
			<Skeleton className='h-full w-1/3' />
			<Skeleton className='h-full w-1/3' />
		</div>
	</div>
)

export default DataTableSkeleton
