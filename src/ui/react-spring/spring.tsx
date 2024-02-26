import { animated, config as defaultConfig, useSpring, type UseSpringProps } from "@react-spring/web"
import { useMemo } from "react"

type SpringProps<T extends React.ElementType = "div"> = {
	as?: T
	transition: UseSpringProps
} & React.ComponentPropsWithRef<T>

function Spring<T extends React.ElementType = "div">({ as = "div" as T, transition, ...props }: SpringProps<T>) {
	const styles = useSpring({ ...transition, config: transition?.config || defaultConfig.stiff })

	const Component = useMemo<React.ElementType>(() => animated[as as "div"], [as])

	return <Component {...props} style={{ ...props?.style, ...styles }} />
}

export default Spring
