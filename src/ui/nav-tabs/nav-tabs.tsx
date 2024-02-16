import { NavLink } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const NavTabs = ({ className, children }: Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) => (
	<div className={twMerge("flex w-full items-center gap-4 border-b border-b-[#E9E9E9] px-6", className)}>
		{children}
	</div>
)

const Item = ({
	className,
	...props
}: Omit<React.ComponentPropsWithoutRef<typeof NavLink>, "className"> & { className?: string }) => (
	<NavLink
		{...props}
		className={({ isActive }) =>
			twMerge(
				"w-max border-b-2 border-transparent px-4 py-3 pt-[14px] text-[#054060] transition-all will-change-[font-weight] prevent-selection hover:font-bold",
				isActive && "pointer-events-none border-b-[#2daef5] font-bold",
				className
			)
		}
	/>
)

NavTabs.Item = Item

export default NavTabs
