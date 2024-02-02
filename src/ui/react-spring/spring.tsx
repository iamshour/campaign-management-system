import { useSpring, config as defaultConfig, animated, type UseSpringProps } from "@react-spring/web"
import { useMemo } from "react"

type SpringProps<T extends React.ElementType = "div"> = {
	transition: UseSpringProps
	as?: T
} & React.ComponentPropsWithRef<T>

function Spring<T extends React.ElementType = "div">({ transition, as = "div" as T, ...props }: SpringProps<T>) {
	const styles = useSpring({ ...transition, config: transition?.config || defaultConfig.stiff })

	const Component = useMemo<React.ElementType>(() => animated[as as "div"], [as])

	return <Component {...props} style={{ ...props?.style, ...styles }} />
}

export default Spring
