//#region Import
import { forwardRef } from "react"
import flags from "react-phone-number-input/flags"
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import { twMerge } from "tailwind-merge"

import Input from "../input"
import SelectCountryPopover from "../select-country-popover"
//#endregion

interface PhoneInputProps extends React.ComponentPropsWithoutRef<typeof PhoneInputWithCountry> {
	size?: React.ComponentPropsWithoutRef<typeof Input>["size"]
}

const PhoneInput = forwardRef<React.ElementRef<typeof PhoneInputWithCountry>, PhoneInputProps>(
	({ className, ...props }, ref) => (
		<PhoneInputWithCountry
			defaultCountry='US'
			ref={ref}
			international
			withCountryCallingCode
			flags={flags}
			countrySelectComponent={(props) => (
				<SelectCountryPopover withCountryCode withPlaceholder={false} className='w-max' size='lg' {...props} />
			)}
			className={twMerge("flex max-w-full gap-2", className)}
			inputComponent={Input}
			{...props}
		/>
	)
)

PhoneInput.displayName = "PhoneInput"

export default PhoneInput
