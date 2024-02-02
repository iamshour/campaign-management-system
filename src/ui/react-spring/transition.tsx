//#region Import
import { animated, useTransition, config as defaultConfig, type UseTransitionProps } from "@react-spring/web"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

interface TransitionProps<Item extends React.ElementType<any>> extends React.HTMLAttributes<HTMLElement> {
	open: boolean
	transition: UseTransitionProps
	as?: Item
}

function Transition<Item extends React.ElementType<any>>({
	open,
	children,
	className,
	transition,
	as = "div" as Item,
	...props
}: TransitionProps<Item>) {
	const transitions = useTransition(open as any, {
		...transition,
		from: { opacity: 0, ...transition?.from },
		enter: { opacity: 1, ...transition?.enter },
		// If Leave Prop wasn't passed, then re-use initial animation state (from prop)
		leave: !transition?.leave ? { opacity: 0, ...transition?.from } : { opacity: 0, ...transition?.leave },
		config: transition?.config || defaultConfig.default,
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

export default Transition
