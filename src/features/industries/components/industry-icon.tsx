//#region Import
import industriesIconsMap, { type IndustryIconEnum } from "@/features/industries/constants/industries-icons-map"
import { lazy } from "react"

const MaterialSymbolsHelpRounded = lazy(() => import("~icons/material-symbols/help-rounded"))
//#endregion

interface IndustryIconProps {
	className?: string
	icon: IndustryIconEnum
}

const IndustryIcon = ({ className, icon }: IndustryIconProps) => {
	const IconToRender = industriesIconsMap[icon as keyof typeof industriesIconsMap]

	// Fallback icon if no Icon was passed
	if (!IconToRender) return <MaterialSymbolsHelpRounded className='text-base !opacity-30' />

	return <IconToRender className={className} />
}

export default IndustryIcon
