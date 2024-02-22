import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

import type { IconType } from "../types"
import cn from "../utils/cn"

const inputVariants = cva(
	"inline-block h-full w-full transition-basic [&_svg]:shrink-0 read-only:pointer-events-none",
	{
		variants: {
			variant: {
				default:
					"bg-transparent text-gray-800 ring-gray-300 read-only:!ring-gray-300 placeholder:text-gray-400 autofill:shadow-[0_0_0_30px_white_inset] border-0 !outline-0 ring-1 !ring-inset focus:ring-2 active:ring-2 focus-within:ring-2 data-[hasvalue=true]:invalid:ring-1 invalid:ring-1 aria-[invalid=true]:!ring-1 focus:ring-primary-500 active:ring-primary-500 focus-within:ring-primary-500 data-[hasvalue=true]:ring-primary-500 data-[hasvalue=true]:invalid:ring-red-500 invalid:ring-red-500 aria-[invalid=true]:!ring-red-500",
				underlined:
					"bg-transparent !rounded-none text-gray-800 border-b-gray-300 placeholder:text-gray-400 autofill:shadow-[0_0_0_30px_white_inset] border-0 border-b !outline-0 !ring-0 focus:!ring-0 focus-within:!ring-0 focus-within:border-b-primary-500 focus:border-b-primary-500 active:border-b-primary-500 data-[hasvalue=true]:border-b-primary-500 data-[hasvalue=true]:invalid:border-b-red-500",
			},
			size: {
				xs: "h-6 p-1.5 text-xs rounded-sm",
				sm: "h-8 px-2.5 text-sm rounded-md",
				default: "h-10 p-4 text-sm rounded-md",
				lg: "h-[50px] p-4 text-base rounded-lg",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	}
)

const iconVariants = cva(
	"pointer-events-none w-max absolute inset-y-1/2 -translate-y-1/2 shrink-0 transition-[color] duration-300 flex-center",
	{
		variants: {
			variant: {
				default: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
				underlined: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
			},
			size: {
				xs: "text-xs",
				sm: "text-sm",
				default: "text-sm",
				lg: "text-base",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	}
)

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	inputClassName?: string
	leftIcon?: IconType
	rightIcon?: IconType
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, inputClassName, leftIcon: LeftIcon, rightIcon: RightIcon, ...props }, ref) => (
		<div className={twMerge("group !relative h-max w-[340px] max-w-full overflow-hidden", className)}>
			{!!LeftIcon && (
				<LeftIcon
					data-hasvalue={!!props?.value}
					className={cn(iconVariants({ variant, size, className: "start-3" }))}
				/>
			)}

			<input
				ref={ref}
				{...props}
				value={props?.value ?? ""}
				data-hasvalue={!!props?.value}
				className={cn(inputVariants({ variant, size, className: inputClassName }), {
					"!ps-10": !!LeftIcon,
					"!pe-10": !!RightIcon,
				})}
			/>

			{!!RightIcon && (
				<RightIcon data-hasvalue={!!props?.value} className={cn(iconVariants({ variant, size, className: "end-3" }))} />
			)}
		</div>
	)
)

Input.displayName = "Input"

export default Input
