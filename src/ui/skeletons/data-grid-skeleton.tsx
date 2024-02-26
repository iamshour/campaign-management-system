//#region Import
import { twMerge } from "tailwind-merge"

import Skeleton from "../skeleton/skeleton"
//#endregion

const DataGridSkeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={twMerge(
			`grid h-full justify-center gap-6 overflow-y-auto p-4 [grid-template-columns:100%] [grid-template-rows:250px] md:gap-7
			 md:[grid-template-columns:repeat(2,minmax(290px,550px))] xl:[grid-template-columns:repeat(3,minmax(290px,550px))] 3xl:[grid-template-columns:repeat(4,minmax(290px,550px))]`,
			className
		)}
		{...props}>
		{Array.from({ length: 6 }, (_, idx) => (
			<Skeleton className='h-[250px] w-full' key={idx} />
		))}
	</div>
)

export default DataGridSkeleton
