//#region Import
import { twMerge } from "tailwind-merge"

import industriesIconsMap from "@/features/industries/constants/industries-icons-map"
import type { IndustryType } from "@/features/industries/types"
//#endregion

interface IndustriesViewTableIconProps extends Pick<IndustryType, "icon" | "color"> {
	className?: string
}

const IndustriesViewTableIcon = ({ icon, color, className }: IndustriesViewTableIconProps) => {
	const IconToRender = industriesIconsMap[icon as keyof typeof industriesIconsMap]

	return (
		<div className={twMerge("w-max rounded-full p-2 flex-center", className)} style={{ backgroundColor: color }}>
			{/* Fallback Icon if no Icon was catched is currently just '?'. May be changed based on requirement   */}
			{!IconToRender ? <>?</> : <IconToRender className='text-lg' />}
		</div>
	)
}

export default IndustriesViewTableIcon
