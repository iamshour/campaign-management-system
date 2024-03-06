//#region Import
import { twMerge } from "tailwind-merge"

import type { IconType } from "../types"
//#endregion

interface SectionHeadingProps {
	/**
	 * Used to style Component
	 */
	className?: string

	/**
	 * Optional string to be rendered below label & icon
	 */
	description?: string

	/**
	 * Icon to be rendered in teh heading component.
	 */
	icon: IconType

	/**
	 * String representing Section Title
	 */
	label: string
}

const SectionHeading = ({ className, description, icon: Icon, label }: SectionHeadingProps) => (
	<div className={twMerge("text-xl", className)}>
		<span className='inline-flex items-center gap-2.5 [font-size:inherit]'>
			<Icon className='shrink-0 text-[#2daef5] [font-size:inherit]' />
			<h2 className='font-bold [font-size:inherit]'>{label}</h2>
		</span>
		{!!description?.length && <p className='ps-8 text-[#545454]'>{description}</p>}
	</div>
)

export default SectionHeading
