//#region Import
import type { IndustryType } from "@/features/industries/types"

import IndustryIcon from "@/features/industries/components/industry-icon"
import { twMerge } from "tailwind-merge"
//#endregion

interface IndustriesViewTableIconProps extends Pick<IndustryType, "color" | "industryIcon"> {
	className?: string
}

const IndustriesViewTableIcon = ({ className, color, industryIcon }: IndustriesViewTableIconProps) => {
	// Fallback color if no color was passed
	const iconColor = color ?? "#edf3f7"

	return (
		<div className={twMerge("w-max rounded-full p-2.5 flex-center", className)} style={{ backgroundColor: iconColor }}>
			<IndustryIcon className='text-xl' icon={industryIcon} />
		</div>
	)
}

export default IndustriesViewTableIcon
