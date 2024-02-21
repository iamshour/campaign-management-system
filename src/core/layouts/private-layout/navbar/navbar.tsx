//#region Import
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import logo from "@/assets/logo.png"
import navElements from "@/core/constants/nav-elements"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { toggleNavbar } from "@/core/slices/app-slice"
import { Button, ErrorBoundary, Spring, Separator, Tooltip } from "@/ui"

import ColapsibleNavLinks from "./collapsible-navlinks"
import NavLink from "./navlink"

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

	const { role } = useSelector(({ auth }) => auth.user)

	const isNavOpen = useSelector(({ app }) => app.isNavOpen)

	// Tracks initial navbar state, so that if its initially open (from storage), it doesn't animate in
	const isInitiallyOpen = useRef(isNavOpen)

	const { i18n, t } = useTranslation()

	const changeLanguage = (lng: "en" | "ar") => i18n.changeLanguage(lng)

	return (
		<ErrorBoundary className='h-full w-[250px]'>
			<Spring
				transition={{ from: { width: isInitiallyOpen?.current ? 250 : 78 }, to: { width: isNavOpen ? 250 : 78 } }}
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
								{isNavOpen ? <LucideChevronsLeft className='rtl:rotate-180' /> : <IcRoundMenu />}
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content
							content={isNavOpen ? t("navbar.toggle-btn.minimize") : t("navbar.toggle-btn.expand")}
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
							!isNavOpen && "scrollbar-none"
						)}
						data-menubar-list
						aria-label='Blue.Ai Navbar'
						role='menubar'
						aria-orientation='horizontal'>
						{navElements
							?.filter((element) => element.roles.includes(role))
							.map((props, idx) => {
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
																!isNavOpen && "w-0 opacity-0"
															)}>
															{t(label)}
														</span>
													</NavLink>
												) : (
													<ColapsibleNavLinks
														Icon={Icon}
														label={t(label)}
														isNavOpen={isNavOpen}
														openSidebar={() => dispatch(toggleNavbar(true))}
														hasActiveChild={props.content?.some((item) => pathname?.includes(item.path))}>
														{props.content.map(({ label, path }) => (
															<NavLink to={path} key={`${label}:${path}`} className='p-2 ps-3 text-sm'>
																{t(label)}
															</NavLink>
														))}
													</ColapsibleNavLinks>
												)}
											</div>
										</Tooltip.Trigger>
										<Tooltip.Content
											hidden={isNavOpen}
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
									<ColapsibleNavLinks
										Icon={RadixIconsGlobe}
										label={t("navbar.language-selector.title")}
										isNavOpen={isNavOpen}
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
									</ColapsibleNavLinks>
								</div>
							</Tooltip.Trigger>
							<Tooltip.Content
								hidden={isNavOpen}
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
