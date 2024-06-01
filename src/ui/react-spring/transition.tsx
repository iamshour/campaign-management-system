//#region Import
import { animated, config as defaultConfig, useTransition, type UseTransitionProps } from "@react-spring/web"
import { memo, useMemo } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

interface TransitionProps<Item extends React.ElementType<any>> extends React.HTMLAttributes<HTMLElement> {
	as?: Item
	open: boolean
	transition: UseTransitionProps
}

const Transition = memo(
	<Item extends React.ElementType<any>>({
		as = "div" as Item,
		children,
		className,
		open,
		transition,
		...props
	}: TransitionProps<Item>) => {
		const transitions = useTransition(open as any, {
			...transition,
			config: transition?.config || defaultConfig.default,
			enter: { opacity: 1, ...transition?.enter },
			from: { opacity: 0, ...transition?.from },
			// If Leave Prop wasn't passed, then re-use initial animation state (from prop)
			leave: !transition?.leave ? { opacity: 0, ...transition?.from } : { opacity: 0, ...transition?.leave },
		})

		const Component = useMemo(() => animated[as as "div"], [as])

		return transitions(
			(styles, item) =>
				item && (
					<Component
						{...props}
						className={twMerge("z-10 flex h-full shrink-0 flex-col overflow-hidden shadow-sm", className)}
						style={styles}>
						{children}
					</Component>
				)
		)
	}
)

Transition.displayName = "Transition"

export default Transition
