//#region Import
import industriesIconsMap from "@/features/industries/constants/industries-icons-map"
import type { IndustryType } from "@/features/industries/types"
//#endregion

const IndustriesViewTableIcon = ({ icon, color }: Pick<IndustryType, "icon" | "color">) => {
	const IconToRender = industriesIconsMap[icon as keyof typeof industriesIconsMap]

	if (!IconToRender) return

	return (
		<div className='w-max rounded-full p-2' style={{ backgroundColor: color }}>
			<IconToRender className='text-lg' />
		</div>
	)
}

export default IndustriesViewTableIcon
