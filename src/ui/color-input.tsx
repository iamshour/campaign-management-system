import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import { twMerge } from "@/ui"

import cn from "./utils/cn"

const colorInputVariants = cva("inline-block h-full w-full transition-basic [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: twMerge(
				`rounded-md bg-transparent ring-gray-300 !outline-0 ring-1 !ring-inset focus:ring-2 active:ring-2
				focus-within:ring-2  invalid:ring-1 aria-[invalid=true]:!ring-1 focus:ring-primary-500
				active:ring-primary-500 focus-within:ring-primary-500 data-[hasvalue=true]:ring-primary-500
				data-[hasvalue=true]:invalid:ring-red-500 invalid:ring-red-500 aria-[invalid=true]:!ring-red-500`
			),
		},
		size: {
			default: "w-[340px] max-w-full h-[50px] px-4 py-2",
		},
	},
	defaultVariants: { variant: "default", size: "default" },
})

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof colorInputVariants> {}

const ColorInput = forwardRef<HTMLInputElement, InputProps>(({ className, variant, size, ...props }, ref) => (
	<input
		type='color'
		ref={ref}
		{...props}
		value={props?.value ?? "#FFFFFF"}
		data-hasvalue={!!props?.value}
		className={cn(colorInputVariants({ variant, size, className }))}
	/>
))

ColorInput.displayName = "ColorInput"

export default ColorInput
