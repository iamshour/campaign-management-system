//#region Import
import RadixIconsGlobe from "~icons/radix-icons/globe"
import flags from "react-phone-number-input/flags"
import { twMerge } from "tailwind-merge"

import type { CountryOption } from "../select-country-popover/select-country-popover-content"
//#endregion

type FlagIconProps = Partial<CountryOption> & React.SVGProps<SVGSVGElement>

/**
 * FlagIcon Component to be rendered inside Phone Number Input or somewhere else
 * @component
 *
 * @example
 * // Example 1: Basic usage
 *         <FlagIcon value="US" label="United States" />
 *
 * @param props - FlagIcon component props
 * @param props.value - Country Code
 * @param props.label - String passed for the title attribute, could be country name or country code
 */
const FlagIcon = ({ className, ...props }: FlagIconProps) => {
	if (!props?.value || !props?.label) return

	const Component: React.ElementType<FlagIconProps & { title: string }> | undefined = flags[props.value]

	if (!Component) return <RadixIconsGlobe className={twMerge("h-5 w-5 shrink-0", className)} />

	return <Component {...props} className={twMerge("h-5 w-5 shrink-0", className)} title={props.label} />
}

export default FlagIcon
