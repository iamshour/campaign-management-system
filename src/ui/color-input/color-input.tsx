//#region Import
import { forwardRef } from "react"

import cn from "../utils/cn"
import colorVariants, { type ColorVariantsType } from "./color-input-variants"
//#endregion

interface ColorInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, ColorVariantsType {}

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(({ className, size, value, ...props }, ref) => (
	<input
		ref={ref}
		type='color'
		{...props}
		className={cn(colorVariants({ className, size }))}
		data-hasvalue={!!value}
		value={value || "#FFFFFF"}
	/>
))

ColorInput.displayName = "ColorInput"

export default ColorInput
