//#region Import
import { twMerge } from "tailwind-merge"
//#endregion

/**
 * Footer Component, can be used in Dialogs, alert-dilogs, and other UI comps
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *      <Footer className='>
 *        My custom footer here
 *       </Footer>
 *
 * @param props - footer element props
 * @param props.children - Footer Child nodes
 */
const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
	<footer
		className={twMerge(
			"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-4 [&_button]:w-full [&_button]:sm:w-max",
			className
		)}
		{...props}
	/>
)

export default Footer
