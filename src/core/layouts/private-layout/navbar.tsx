//#region Import
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink as DefaultNavLink, NavLinkProps, useLocation } from "react-router-dom"

import logo from "@/assets/logo.png"
import navElements from "@/core/constants/nav-elements"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { toggleNavbar } from "@/core/slices/app-slice"
import { Button, Collapsible, ErrorBoundary, Spring, Separator, Tooltip, twMerge, type IconType } from "@/ui"

import IcRoundMenu from "~icons/ic/round-menu"
import LucideChevronsLeft from "~icons/lucide/chevrons-left"
import RadixIconsGlobe from "~icons/radix-icons/globe"
//#endregion

const TOOLTIP_CONFIGS = {
	side: "right",
	sideOffset: 10,
} as const

const Navbar = () => {
	const { pathname } = useLocation()

	const dispatch = useDispatch()
	const isNavbarOpen = useSelector(({ app }) => app.isNavbarOpen)

	// Tracks initial navbar state, so that if its initially open (from storage), it doesn't animate in
	const isInitiallyOpen = useRef(isNavbarOpen)

	const { i18n, t } = useTranslation()

	const changeLanguage = (lng: "en" | "ar") => i18n.changeLanguage(lng)

	return (
		<ErrorBoundary className='h-full w-[250px]'>
			<Spring
				transition={{ from: { width: isInitiallyOpen?.current ? 250 : 78 }, to: { width: isNavbarOpen ? 250 : 78 } }}
				aria-label='Blue.Ai Navbar'
				className='z-50 flex h-screen flex-col bg-[#054060] shadow-[0_3px_18px_#77777715]'>
				{/* Top Section  */}
				<div className={`flex h-[calc(100%-172px)] flex-1 flex-col gap-2 p-2`}>
					<Tooltip>
						<Tooltip.Trigger asChild>
							<Button
								className='me-2 w-max self-end px-3 py-6 text-xl !text-white flex-center hover:bg-white hover:bg-opacity-10'
								onClick={() => dispatch(toggleNavbar())}
								variant='ghost'>
								{isNavbarOpen ? <LucideChevronsLeft className='rtl:rotate-180' /> : <IcRoundMenu />}
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content
							content={isNavbarOpen ? t("navbar.toggle-btn.minimize") : t("navbar.toggle-btn.expand")}
							side={TOOLTIP_CONFIGS.side}
							sideOffset={TOOLTIP_CONFIGS.sideOffset}
						/>
					</Tooltip>

					<div className='flex items-center justify-center py-2'>
						<img src={logo} alt='Blue.Ai Logo' className='ms-2 h-[60px] w-auto' />
					</div>

					<div
						className={twMerge(
							"flex w-full flex-1 flex-col gap-1.5 overflow-y-auto overflow-x-hidden px-[7px] py-3",
							!isNavbarOpen && "scrollbar-none"
						)}
						data-menubar-list
						aria-label='Blue.Ai Navbar'
						role='menubar'
						aria-orientation='horizontal'>
						{navElements.map((props, idx) => {
							const { label, type, Icon } = props

							return (
								<Tooltip key={`${label}-${idx}`}>
									<Tooltip.Trigger asChild={type === "accordion"}>
										<div>
											{type === "nav-link" ? (
												<NavLink to={props.path} key={`${label}:${props?.path}`} className='p-3'>
													<Icon className='h-[22px] w-[22px] shrink-0' />
													<span
														className={twMerge(
															"w-full flex-1 whitespace-nowrap text-start transition-[opacity] duration-300 ease-in-out",
															!isNavbarOpen && "w-0 opacity-0"
														)}>
														{t(label)}
													</span>
												</NavLink>
											) : (
												<NavCollapsible
													Icon={Icon}
													label={t(label)}
													isNavbarOpen={isNavbarOpen}
													openSidebar={() => dispatch(toggleNavbar(true))}
													hasActiveChild={props.content?.some((item) => pathname?.includes(item.path))}>
													{props.content.map(({ label, path }) => (
														<NavLink to={path} key={`${label}:${path}`} className='p-2 ps-3 text-sm'>
															{t(label)}
														</NavLink>
													))}
												</NavCollapsible>
											)}
										</div>
									</Tooltip.Trigger>
									<Tooltip.Content
										hidden={isNavbarOpen}
										content={t(label)}
										side={TOOLTIP_CONFIGS.side}
										sideOffset={TOOLTIP_CONFIGS.sideOffset}
									/>
								</Tooltip>
							)
						})}
					</div>
				</div>

				<Separator className='my-2 opacity-50' />

				{/* Bottom Secton */}
				<div className='flex h-max min-h-max w-full flex-col p-2'>
					<div className='flex w-full flex-col gap-2 px-[7px]'>
						<Tooltip>
							<Tooltip.Trigger asChild>
								<div>
									<NavCollapsible
										Icon={RadixIconsGlobe}
										label={t("navbar.language-selector.title")}
										isNavbarOpen={isNavbarOpen}
										openSidebar={() => dispatch(toggleNavbar(true))}>
										<Button
											className='w-full justify-start text-sm text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-500'
											size='sm'
											variant='ghost'
											active={i18n.language === "en"}
											onClick={() => changeLanguage("en")}>
											{t("navbar.language-selector.options.english")}
										</Button>
										<Button
											className='w-full justify-start text-sm text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-500'
											size='sm'
											variant='ghost'
											active={i18n.language === "ar"}
											onClick={() => changeLanguage("ar")}>
											{t("navbar.language-selector.options.arabic")}
										</Button>
									</NavCollapsible>
								</div>
							</Tooltip.Trigger>
							<Tooltip.Content
								hidden={isNavbarOpen}
								content={t("navbar.language-selector.title")}
								side={TOOLTIP_CONFIGS.side}
								sideOffset={TOOLTIP_CONFIGS.sideOffset}
							/>
						</Tooltip>
					</div>
				</div>
			</Spring>
		</ErrorBoundary>
	)
}

export default Navbar

interface NavCollapsibleProps {
	Icon: IconType
	label: string
	openSidebar: () => void
	children: React.ReactNode
	isNavbarOpen: boolean
	hasActiveChild?: boolean
}

const NavCollapsible = ({ Icon, label, isNavbarOpen, openSidebar, hasActiveChild, children }: NavCollapsibleProps) => {
	const [collapsibleOpen, setCollapsibleOpen] = useState(false)

	return (
		<Collapsible
			open={!isNavbarOpen ? false : collapsibleOpen}
			onClick={() => !isNavbarOpen && openSidebar()}
			onOpenChange={(openState) => {
				setCollapsibleOpen(openState)
				if (!isNavbarOpen) openSidebar()
			}}
			className={twMerge(
				"w-full overflow-hidden rounded-md bg-transparent !bg-opacity-5 text-start text-white transition-basic data-[state=open]:bg-white hover:bg-white",
				hasActiveChild && "bg-white data-[state=closed]:!bg-opacity-20"
			)}>
			<Collapsible.Trigger showArrow={isNavbarOpen} className='p-3 prevent-selection'>
				<Icon className='h-[22px] w-[22px] text-white' />
				<span
					className={twMerge(
						"flex-1 whitespace-nowrap text-start transition-[opacity] duration-300 ease-in-out",
						!isNavbarOpen && "opacity-0"
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

const NavLink = ({ className, ...props }: { className: string } & Omit<NavLinkProps, "className">) => (
	<DefaultNavLink
		{...props}
		data-menubar-listitem
		role='navigation'
		className={({ isActive }) =>
			twMerge(
				"flex h-full w-full items-center justify-start gap-2 truncate rounded-md text-white !outline-0 prevent-selection transition-basic hover:bg-white hover:bg-opacity-10 hover:text-white focus-visible:ring-2 focus-visible:ring-primary-500",
				className,
				isActive && "pointer-events-none bg-white bg-opacity-20"
			)
		}
	/>
)
