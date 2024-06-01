import { type VariantProps } from "class-variance-authority"
import { lazy } from "react"
import { twMerge } from "tailwind-merge"

const MaterialSymbolsLock = lazy(() => import("~icons/material-symbols/lock"))

import type { IconType } from "../types"

import iconVariants from "../input/icon-variants"
import inputVariants from "../input/input-variants"
import Label from "../label/label"
import cn from "../utils/cn"

export interface ReadonlyInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "readOnly" | "size">,
		VariantProps<typeof inputVariants> {
	label?: string
	leftIcon?: IconType
	rightIcon?: IconType
	showLock?: boolean
}

const ReadonlyInput = ({
	className,
	label,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	showLock,
	size,
	value,
	variant,
}: ReadonlyInputProps) => (
	<div className='flex flex-col'>
		{label && <Label size={size}>{label}</Label>}
		<div className={twMerge("group !relative h-max w-[340px] max-w-full overflow-hidden", className)}>
			{!!LeftIcon && (
				<LeftIcon className={cn(iconVariants({ className: "start-3", size, variant }))} data-hasvalue={!!value} />
			)}

			<p
				className={cn(inputVariants({ size, variant }), {
					"!pe-10": !!RightIcon,
					"!ps-10": !!LeftIcon,
					block: true,
				})}>
				{value}
			</p>

			{showLock && (
				<MaterialSymbolsLock
					className={cn(iconVariants({ className: "end-3 h-4 w-4 text-[#9899A7]", size, variant }))}
				/>
			)}

			{!showLock && !!RightIcon && (
				<RightIcon className={cn(iconVariants({ className: "end-3", size, variant }))} data-hasvalue={!!value} />
			)}
		</div>
	</div>
)

ReadonlyInput.displayName = "ReadonlyInput"

export default ReadonlyInput
