import { type VariantProps } from "class-variance-authority"
import { forwardRef, lazy } from "react"
import { twMerge } from "tailwind-merge"

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

import type { IconType } from "../types"

import Label from "../label/label"
import cn from "../utils/cn"
import iconVariants from "./icon-variants"
import inputVariants from "./input-variants"

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	inputClassName?: string
	label?: React.ReactNode | string
	leftIcon?: IconType
	rightIcon?: IconType
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			"aria-invalid": invalid,
			className,
			inputClassName,
			label,
			leftIcon: LeftIcon,
			readOnly,
			rightIcon: RightIcon,
			size,
			variant,
			...props
		},
		ref
	) => (
		<div className={twMerge("h-max w-[340px] max-w-full", className)}>
			{!!label && (
				<Label aria-invalid={invalid} htmlFor={`${props?.name}-field`} size={size}>
					{label}
				</Label>
			)}

			<div className='group !relative h-max w-full overflow-hidden'>
				{!!LeftIcon && (
					<LeftIcon
						className={cn(iconVariants({ className: "start-3", size, variant }))}
						data-hasvalue={!!props?.value}
					/>
				)}

				<input
					{...props}
					aria-invalid={invalid}
					className={cn(inputVariants({ className: inputClassName, size, variant }), {
						"!pe-10": !!RightIcon,
						"!ps-10": !!LeftIcon,
					})}
					data-hasvalue={!!props?.value}
					id={label ? `${props?.name}-field` : undefined}
					readOnly={readOnly}
					ref={ref}
					value={props?.value ?? (ref === undefined ? "" : undefined)}
				/>

				{readOnly && (
					<MaterialSymbolsLock
						className={cn(iconVariants({ className: "end-3 h-4 w-4 text-[#9899A7]", size, variant }))}
					/>
				)}

				{!readOnly && !!RightIcon && (
					<RightIcon
						className={cn(iconVariants({ className: "end-3", size, variant }))}
						data-hasvalue={!!props?.value}
					/>
				)}
			</div>
		</div>
	)
)

Input.displayName = "Input"

export default Input
