//#region Import
import useSelector from "@/core/hooks/useSelector"
import type { AdvancedTableStateType } from "@/core/slices/advanced-table-slice/types"
import { Skeleton, DataGridSkeleton, HorizontalSkeleton, TableSkeleton } from "@/ui"
//#endregion

const GroupsViewSkeleton = () => {
	const { view } = useSelector<AdvancedTableStateType<"groups">>(({ advancedTable }) => advancedTable["groups"])

	return (
		<div className='flex w-full flex-col'>
			<HorizontalSkeleton />
			<Skeleton className='mb-4 me-4 h-[40px] w-[100px] self-end' />

			{view === "Grid View" ? (
				<DataGridSkeleton className='px-8' />
			) : (
				<div className='mb-4 w-full flex-1 px-4 '>
					<TableSkeleton colsLength={5} className='w-full' />
				</div>
			)}

			<HorizontalSkeleton className='mt-4 min-h-[65px]' />
		</div>
	)
}

export default GroupsViewSkeleton
