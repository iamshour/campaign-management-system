//#region Import
import { Collapsible, type IconType } from "@/ui"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

interface ColapsibleNavLinksProps {
	children: React.ReactNode
	hasActiveChild?: boolean
	Icon: IconType
	isNavOpen: boolean
	label: string
	openSidebar: () => void
}

const ColapsibleNavLinks = ({
	children,
	hasActiveChild,
	Icon,
	isNavOpen,
	label,
	openSidebar,
}: ColapsibleNavLinksProps) => {
	const [collapsibleOpen, setCollapsibleOpen] = useState(false)

	return (
		<Collapsible
			className={twMerge(
				"w-full overflow-hidden rounded-md bg-transparent !bg-opacity-5 text-start text-white transition-basic data-[state=open]:bg-white hover:bg-white",
				hasActiveChild && "bg-white data-[state=closed]:!bg-opacity-20"
			)}
			onClick={() => !isNavOpen && openSidebar()}
			onOpenChange={(openState) => {
				setCollapsibleOpen(openState)

				if (!isNavOpen) openSidebar()
			}}
			open={!isNavOpen ? false : collapsibleOpen}>
			<Collapsible.Trigger className='p-3 prevent-selection' showArrow={isNavOpen}>
				<Icon className='h-[22px] w-[22px] text-white' />
				<span
					className={twMerge(
						"flex-1 whitespace-nowrap text-start transition-[opacity] duration-300 ease-in-out",
						!isNavOpen && "opacity-0"
					)}>
					{label}
				</span>
			</Collapsible.Trigger>
			<Collapsible.Content className='ms-6'>
				<div className='mt-0.5 flex flex-col gap-0.5 p-2 !pt-0'>{children}</div>
			</Collapsible.Content>
		</Collapsible>
	)
}

export default ColapsibleNavLinks
