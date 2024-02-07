//#region Import
import { Skeleton } from "@/ui"
//#endregion

const FullViewSkeleton = () => (
	<div className='flex h-full w-full flex-col gap-4 p-6'>
		<Skeleton className='h-8' />
		<Skeleton className='flex-1 rounded-xl' />
	</div>
)

export default FullViewSkeleton