//#region Import
import React, { forwardRef } from "react"
import { Link } from "react-router-dom"

import cn from "../utils/cn"

import buttonVariants, { type ButtonVariantsType } from "./button-variants"

import SvgSpinnersRingResize from "~icons/svg-spinners/ring-resize"
//#endregion

type CommonTypes = ButtonVariantsType & {
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

	/**
	 * Boolean used if button is disabled
	 */
	disabled?: boolean
}

type ChildAsButtonProps = { as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>
type ChildAsLinkProps = { as?: "link" } & React.ComponentPropsWithoutRef<typeof Link>

type ButtonProps = CommonTypes & (ChildAsButtonProps | ChildAsLinkProps)

const Button = forwardRef<HTMLElement, ButtonProps>(
	(
		{ className, variant, size, as = "button", loading = false, children, disabled, active, hasValue, ...props },
		ref
	) => {
		const Comp = as === "link" ? Link : "button"

		return (
			<Comp
				{...props}
				disabled={disabled || loading}
				data-active={active}
				data-hasvalue={hasValue}
				className={cn(buttonVariants({ variant, size, className }))}
				// eslint-disable-next-line
				// @ts-ignore
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
