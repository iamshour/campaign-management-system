//#region Import
import { twMerge } from "tailwind-merge"

import IndustryIcon from "@/features/industries/components/industry-icon"
import type { IndustryType } from "@/features/industries/types"
//#endregion

interface IndustriesViewTableIconProps extends Pick<IndustryType, "icon" | "color"> {
	className?: string
}

const IndustriesViewTableIcon = ({ icon, color, className }: IndustriesViewTableIconProps) => {
	// Fallback color if no color was passed
	const iconColor = color ?? "#edf3f7"

	return (
		<div className={twMerge("w-max rounded-full p-2.5 flex-center", className)} style={{ backgroundColor: iconColor }}>
			<IndustryIcon icon={icon} className='text-xl' />
		</div>
	)
}

export default IndustriesViewTableIcon
