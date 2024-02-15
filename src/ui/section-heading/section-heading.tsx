//#region Import
import type { IconType } from "../types"
//#endregion

interface SectionHeadingProps {
	/**
	 * Icon to be rendered in teh heading component.
	 */
	icon: IconType

	/**
	 * String representing Section Title
	 */
	label: string

	/**
	 * Optional string to be rendered below label & icon
	 */
	description?: string

	/**
	 * Used to style Component
	 */
	className?: string
}

const SectionHeading = ({ icon: Icon, label, description, className }: SectionHeadingProps) => {
	return (
		<div className={className}>
			<span className='inline-flex items-center gap-2.5'>
				<Icon className='shrink-0 text-xl text-[#2daef5]' />
				<h2 className='text-xl font-bold'>{label}</h2>
			</span>
			{!!description?.length && <p className='ps-8 text-[#545454]'>{description}</p>}
		</div>
	)
}

export default SectionHeading