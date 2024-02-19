//#region Import
import { forwardRef } from "react"
//#endregion

import { twMerge } from "@/ui"

const ColorInput = forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">>(
	({ className, ...props }, ref) => (
		<input
			type='color'
			ref={ref}
			{...props}
			value={props?.value ?? "#FFFFFF"}
			data-hasvalue={!!props?.value}
			className={twMerge(
				`inline-block h-[50px] w-[340px] max-w-full rounded-md bg-transparent px-4 py-2 !outline-0 ring-1 !ring-inset ring-gray-300 transition-basic invalid:ring-1 invalid:ring-red-500 focus-within:ring-2
		focus-within:ring-primary-500  aria-[invalid=true]:!ring-1 aria-[invalid=true]:!ring-red-500 data-[hasvalue=true]:ring-primary-500
		data-[hasvalue=true]:invalid:ring-red-500 focus:ring-2 focus:ring-primary-500
		active:ring-2 active:ring-primary-500 [&_svg]:shrink-0`,
				className
			)}
		/>
	)
)

ColorInput.displayName = "ColorInput"

export default ColorInput
