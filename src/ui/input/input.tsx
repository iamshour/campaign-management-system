//#region Import
import { forwardRef, lazy } from "react"
import { twMerge } from "tailwind-merge"

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

import type { IconType } from "../types"

import cn from "../utils/cn"
import iconVariants from "./icon-variants"
import inputVariants, { type InputVariantsType } from "./input-variants"
//#endregion

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, InputVariantsType {
	inputClassName?: string
	leftIcon?: IconType
	rightIcon?: IconType
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			"aria-invalid": invalid,
			className,
			leftIcon: LeftIcon,
			readOnly,
			rightIcon: RightIcon,
			size,
			value,
			variant,
			...props
		},
		ref
	) => (
		<div className={twMerge("group !relative h-max w-full overflow-hidden", className)}>
			{!!LeftIcon && (
				<LeftIcon className={cn(iconVariants({ className: "start-3", size, variant }))} data-hasvalue={!!value} />
			)}

			<input
				ref={ref}
				{...props}
				aria-invalid={invalid}
				className={cn(inputVariants({ size, variant }), { "!pe-10": !!RightIcon, "!ps-10": !!LeftIcon })}
				data-hasvalue={!!value}
				readOnly={readOnly}
				value={value || ""}
			/>

			{readOnly && (
				<MaterialSymbolsLock
					className={cn(iconVariants({ className: "end-3 h-4 w-4 text-[#9899A7]", size, variant }))}
				/>
			)}

			{!readOnly && !!RightIcon && (
				<RightIcon className={cn(iconVariants({ className: "end-3", size, variant }))} data-hasvalue={!!value} />
			)}
		</div>
	)
)

Input.displayName = "Input"

export default Input
