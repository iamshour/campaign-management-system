//#region Import
import HorizontalSkeleton from "./horizontal-skeleton"
import TableSkeleton from "./table-skeleton"
//#endregion

const DataTableSkeleton = ({
	colsLength,
	rowsLength,
}: Pick<React.ComponentPropsWithoutRef<typeof TableSkeleton>, "colsLength" | "rowsLength">) => (
	<div className='flex h-full w-full flex-col gap-4'>
		<HorizontalSkeleton />
		<TableSkeleton colsLength={colsLength} rowsLength={rowsLength} className='flex-1' />
		<HorizontalSkeleton className='min-h-[80px]' />
	</div>
)

export default DataTableSkeleton
