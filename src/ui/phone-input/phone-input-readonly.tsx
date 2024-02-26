//#region Import
import { parsePhoneNumber } from "react-phone-number-input"
import { twMerge } from "tailwind-merge"

import Input from "../input/input"
import FlagIcon from "./flag-icon"
//#endregion

interface PhoneInputReadonlyProps extends React.ComponentPropsWithoutRef<typeof Input> {
	value: string
}

const PhoneInputReadonly = ({ value, ...props }: PhoneInputReadonlyProps) => {
	const countryInfo = parsePhoneNumber(`+${value}`)

	return (
		<div className='flex w-full gap-2'>
			<div
				className={twMerge(
					"h-[50px] w-[54px] border border-gray-300 flex-center",
					props?.size === "lg" ? "rounded-lg" : "rounded-md"
				)}>
				{countryInfo?.country ? (
					<FlagIcon className='h-5 w-5 md:h-8 md:w-8' label={countryInfo?.country} value={countryInfo?.country} />
				) : (
					"N/A"
				)}
			</div>

			<Input
				aria-label={value}
				// eslint-disable-next-line
				autoFocus={false}
				readOnly
				value={value}
				{...props}
			/>
		</div>
	)
}

export default PhoneInputReadonly
