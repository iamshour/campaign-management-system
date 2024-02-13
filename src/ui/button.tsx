//#region Import
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import cn from "./utils/cn"

import SvgSpinnersRingResize from "~icons/svg-spinners/ring-resize"
//#endregion

const buttonVariants = cva(
	"relative border prevent-selection border-transparent rounded-md inline-flex items-center gap-2 truncate overflow-hidden justify-center text-sm font-medium ring-offset-white transition-basic outline-0 focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-[#054060] text-white hover:bg-opacity-80",
				destructive: "bg-red-500 text-slate-50 hover:bg-opacity-75",
				outline: "border-current bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-800",
				"outline-secondary":
					"border-current bg-white text-gray-400 border-gray-300 hover:bg-primary-50 hover:text-primary-800 hover:border-primary-700 data-[hasvalue=true]:border-primary-500 data-[hasvalue=true]:text-primary-800 data-[active=true]:bg-primary-50 data-[active=true]:text-primary-800 data-[active=true]:border-primary-700",
				secondary: "bg-primary-600 text-white hover:bg-opacity-75",
				ghost:
					"hover:bg-primary-50/75 hover:text-primary-950 data-[active=true]:bg-white data-[active=true]:text-black ",
				link: "text-primary-600 underline-offset-4 underline hover:text-opacity-75",
				text: "text-primary-700 hover:text-opacity-75",
			},
			size: {
				xs: "h-6 px-1.5 gap-1 text-xs",
				sm: "h-8 gap-1.5 px-2.5 text-sm rounded-md",
				default: "h-10 gap-2 px-4 text-sm rounded-md",
				lg: "h-[50px] gap-2 px-4 text-lg rounded-lg",
			},
		},
		defaultVariants: { variant: "default", size: "default" },
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	/**
	 * Boolean passed if button used to pass props to a child component to be wrapped by button
	 */
	asChild?: boolean

	/**
	 * Boolean used if an asychronous action is pending
	 */
	loading?: boolean

	/**
	 * Boolean used if button is active
	 */
	active?: boolean

	/**
	 * Boolean used if the button holds some value (i.e. When used as combobox trigger, etc..)
	 */
	hasValue?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, asChild = false, loading = false, children, disabled, active, hasValue, ...props },
		ref
	) => {
		const Comp = asChild ? Slot : "button"

		return (
			<Comp
				{...props}
				disabled={disabled || loading}
				data-active={active}
				data-hasvalue={hasValue}
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}>
				{children}

				{loading && (
					<div className='absolute inset-0 z-10 h-full w-full bg-[rgba(255,255,255,0.7)] text-black backdrop-blur-xl flex-center'>
						<SvgSpinnersRingResize className='text-current' />
					</div>
				)}
			</Comp>
		)
	}
)
Button.displayName = "Button"

export default Button
