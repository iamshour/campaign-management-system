//#region Import
import { Label, Tooltip } from "@/ui"
import { twMerge } from "tailwind-merge"
//#endregion

type ReadonlyFieldProps = {
	/**
	 * ClassName used to style component
	 */
	className?: string

	/**
	 * Label called from localization namespace ("senders-management:fields.FIELD_NAME")
	 */
	label: string
} & (
	| {
			/**
			 * Value used to be displayed for Field. Can be a string or a React.Node
			 */
			children: React.ReactNode | string

			/**
			 * Bool check used for whether we want to display value inside a tooltip on hover, or nor
			 */
			showTooltip?: false
	  }
	| {
			/**
			 * Value used to be displayed for Field. Must only be a string since we're rendering a Tooltip, which will display value (children) inside Tooltip comp
			 */
			children: string

			/**
			 * Bool check used for whether we want to display value inside a tooltip on hover, or nor
			 */
			showTooltip: true
	  }
)

const ReadonlyField = ({ children, className, label, showTooltip }: ReadonlyFieldProps) => {
	if (!children) return

	return (
		<div className={twMerge("w-full space-x-2 rounded-lg border border-[#E0E0E0] bg-white p-2", className)}>
			<Label className='text-base font-bold text-black'>{label}</Label>

			{showTooltip ? (
				<Tooltip align='center' className='max-w-[380px]' content={children} side='top' sideOffset={12}>
					<p className='line-clamp-3 text-base text-black'>{children}</p>
				</Tooltip>
			) : (
				<p className='line-clamp-3 text-base text-black'>{children}</p>
			)}
		</div>
	)
}

export default ReadonlyField
