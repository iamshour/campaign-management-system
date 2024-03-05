import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, lazy } from "react"
import { twMerge } from "tailwind-merge"

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

import type { IconType } from "../types"

import cn from "../utils/cn"

const inputVariants = cva(
	"inline-block h-full w-full transition-basic [&_svg]:shrink-0 read-only:pointer-events-none",
	{
		defaultVariants: { size: "default", variant: "default" },
		variants: {
			size: {
				default: "h-10 p-4 text-sm rounded-md",
				lg: "h-[50px] p-4 text-base rounded-lg",
				sm: "h-8 px-2.5 text-sm rounded-md",
				xs: "h-6 p-1.5 text-xs rounded-sm",
			},
			variant: {
				default: `bg-transparent text-gray-800 ring-gray-300 placeholder:text-gray-400 autofill:shadow-[0_0_0_30px_white_inset] border-0 !outline-0 ring-1
					 !ring-inset focus:ring-2 active:ring-2 focus-within:ring-2 data-[hasvalue=true]:invalid:ring-1 invalid:ring-1 aria-[invalid=true]:!ring-1 focus:ring-primary-500 
					 active:ring-primary-500 focus-within:ring-primary-500 data-[hasvalue=true]:ring-primary-500 data-[hasvalue=true]:invalid:ring-red-500 invalid:ring-red-500 
					 aria-[invalid=true]:!ring-red-500`,
				underlined: `bg-transparent !rounded-none text-gray-800 border-b-gray-300 placeholder:text-gray-400 autofill:shadow-[0_0_0_30px_white_inset] border-0 border-b !outline-0 
				!ring-0 focus:!ring-0 focus-within:!ring-0 focus-within:border-b-primary-500 focus:border-b-primary-500 active:border-b-primary-500 data-[hasvalue=true]:border-b-primary-500
				 data-[hasvalue=true]:invalid:border-b-red-500`,
			},
		},
	}
)

const iconVariants = cva(
	"pointer-events-none w-max absolute inset-y-1/2 -translate-y-1/2 shrink-0 transition-[color] duration-300 flex-center",
	{
		defaultVariants: { size: "default", variant: "default" },
		variants: {
			size: {
				default: "text-sm",
				lg: "text-base",
				sm: "text-sm",
				xs: "text-xs",
			},
			variant: {
				default: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
				underlined: "text-gray-400 group-focus-within:text-primary-600 data-[hasvalue=true]:text-primary-600",
			},
		},
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
	({ className, inputClassName, leftIcon: LeftIcon, readOnly, rightIcon: RightIcon, size, variant, ...props }, ref) => (
		<div className={twMerge("group !relative h-max w-[340px] max-w-full overflow-hidden", className)}>
			{!!LeftIcon && (
				<LeftIcon
					className={cn(iconVariants({ className: "start-3", size, variant }))}
					data-hasvalue={!!props?.value}
				/>
			)}

			<input
				ref={ref}
				{...props}
				className={cn(inputVariants({ className: inputClassName, size, variant }), {
					"!pe-10": !!RightIcon,
					"!ps-10": !!LeftIcon,
				})}
				data-hasvalue={!!props?.value}
				readOnly={readOnly}
				value={props?.value ?? ""}
			/>

			{readOnly && (
				<MaterialSymbolsLock
					className={cn(iconVariants({ className: "end-3 h-4 w-4 text-[#9899A7]", size, variant }))}
				/>
			)}

			{!readOnly && !!RightIcon && (
				<RightIcon className={cn(iconVariants({ className: "end-3", size, variant }))} data-hasvalue={!!props?.value} />
			)}
		</div>
	)
)

Input.displayName = "Input"

export default Input
