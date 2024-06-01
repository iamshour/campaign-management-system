//#region Import
import { NavLink as DefaultNavLink } from "react-router-dom"
import { twMerge } from "tailwind-merge"
//#endregion

const NavLink = ({
	className,
	...props
}: { className: string } & Omit<React.ComponentPropsWithoutRef<typeof DefaultNavLink>, "className">) => (
	<DefaultNavLink
		{...props}
		className={({ isActive }) =>
			twMerge(
				`flex h-full w-full items-center justify-start gap-2 truncate rounded-md text-white !outline-0 prevent-selection transition-basic
				 hover:bg-white hover:bg-opacity-10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-500`,
				className,
				isActive && "pointer-events-none bg-white bg-opacity-20"
			)
		}
		data-menubar-listitem
		role='navigation'
	/>
)

export default NavLink
