//#region Import
import { Skeleton } from "@/ui"
//#endregion

const SegmentFunnelSkeleton = () => (
	<div className='flex h-full w-full flex-col gap-4 p-6'>
		<Skeleton className='h-8' />
		<Skeleton className='h-[206px] rounded-xl' />
		<Skeleton className='h-[94px] rounded-xl' />
	</div>
)

export default SegmentFunnelSkeleton
