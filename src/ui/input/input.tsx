import { type VariantProps } from "class-variance-authority"
import { forwardRef, lazy } from "react"
import { twMerge } from "tailwind-merge"

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

import type { IconType } from "../types"

import cn from "../utils/cn"
import iconVariants from "./icon-variants"
import inputVariants from "./input-variants"

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
