//#region Import
import { Skeleton } from "@/ui"
//#endregion

const FullViewSkeleton = () => (
	<div className='flex h-full w-full flex-col gap-3 p-6'>
		<Skeleton className='h-10' />
		<Skeleton className='flex-1 rounded-xl' />
		<Skeleton className='h-10' />
	</div>
)

export default FullViewSkeleton
