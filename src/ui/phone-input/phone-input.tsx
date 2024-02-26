//#region Import
import { forwardRef } from "react"
import flags from "react-phone-number-input/flags"
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import { twMerge } from "tailwind-merge"

import Input from "../input/input"
import SelectCountryPopover from "../select-country-popover/select-country-popover"
//#endregion

interface PhoneInputProps extends React.ComponentPropsWithoutRef<typeof PhoneInputWithCountry> {
	onChange: (val?: string) => void
	size?: React.ComponentPropsWithoutRef<typeof Input>["size"]
}

const PhoneInput = forwardRef<React.ElementRef<typeof PhoneInputWithCountry>, PhoneInputProps>(
	({ className, onChange, ...props }, ref) => (
		<PhoneInputWithCountry
			className={twMerge("flex max-w-full gap-2", className)}
			countrySelectComponent={(props) => (
				<SelectCountryPopover className='w-max' size='lg' withCountryCode withPlaceholder={false} {...props} />
			)}
			defaultCountry='US'
			flags={flags}
			inputComponent={Input}
			international
			onChange={(val?: string) => onChange(val || undefined)}
			ref={ref}
			withCountryCallingCode
			{...props}
		/>
	)
)

PhoneInput.displayName = "PhoneInput"

export default PhoneInput
