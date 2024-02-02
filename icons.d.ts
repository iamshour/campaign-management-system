declare module "~icons/*" {
	import React from "react"

	export declare type IconType = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement

	const icon: IconType
	export default icon
}
