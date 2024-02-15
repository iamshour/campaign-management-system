//#region Import
import { lazy } from "react"
import { twMerge } from "tailwind-merge"

import industriesIconsMap from "@/features/industries/constants/industries-icons-map"
import type { IndustryType } from "@/features/industries/types"
//#endregion

const MaterialSymbolsHelpRounded = lazy(() => import("~icons/material-symbols/help-rounded"))
interface IndustriesViewTableIconProps extends Pick<IndustryType, "icon" | "color"> {
	className?: string
}

const IndustriesViewTableIcon = ({ icon, color, className }: IndustriesViewTableIconProps) => {
	// Fallback icon if no Icon was passed
	const IconToRender = industriesIconsMap[icon as keyof typeof industriesIconsMap] ?? MaterialSymbolsHelpRounded

	// Fallback color if no color was passed
	const iconColor = color ?? "#edf3f7"

	return (
		<div className={twMerge("w-max rounded-full p-2.5 flex-center", className)} style={{ backgroundColor: iconColor }}>
			<IconToRender className='text-xl' />
		</div>
	)
}

export default IndustriesViewTableIcon
