//#region Import
import navElements from "@/core/constants/nav-elements"
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import { toggleNavbar } from "@/core/slices/app-slice"
import { Button, ErrorBoundary, Separator, Spring, Tooltip } from "@/ui"
import IcRoundMenu from "~icons/ic/round-menu"
import LucideChevronsLeft from "~icons/lucide/chevrons-left"
import RadixIconsGlobe from "~icons/radix-icons/globe"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import ColapsibleNavLinks from "./collapsible-navlinks"
import NavLink from "./navlink"
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

	const changeLanguage = (lng: "ar" | "en") => i18n.changeLanguage(lng)

	return (
		<ErrorBoundary className='h-full w-[250px]'>
			<Spring
				aria-label='Navbar'
				className='z-50 flex h-screen flex-col bg-[#054060] shadow-[0_3px_18px_#77777715]'
				transition={{ from: { width: isInitiallyOpen?.current ? 250 : 78 }, to: { width: isNavOpen ? 250 : 78 } }}>
				{/* Top Section  */}
				<div className={`flex h-[calc(100%-172px)] flex-1 flex-col gap-2 p-2`}>
					<Tooltip
						content={isNavOpen ? t("navbar.toggle-btn.minimize") : t("navbar.toggle-btn.expand")}
						side={TOOLTIP_CONFIGS.side}
						sideOffset={TOOLTIP_CONFIGS.sideOffset}>
						<Button
							className='me-2 w-max self-end px-3 py-6 text-xl !text-white flex-center hover:bg-white hover:bg-opacity-10'
							onClick={() => dispatch(toggleNavbar())}
							variant='ghost'>
							{isNavOpen ? <LucideChevronsLeft className='rtl:rotate-180' /> : <IcRoundMenu />}
						</Button>
					</Tooltip>

					<div className='w-full px-2 py-4 flex-center'>
						<div className='h-[40px] w-full rounded-full border border-white/80 p-4 text-sm text-white/80 flex-center'>
							Logo
						</div>
					</div>

					<div
						aria-label='Navbar'
						aria-orientation='horizontal'
						className={twMerge(
							"flex w-full flex-1 flex-col gap-1.5 overflow-y-auto overflow-x-hidden px-[7px] py-3",
							!isNavOpen && "scrollbar-none"
						)}
						data-menubar-list
						role='menubar'>
						{navElements
							?.filter((element) => element.roles.includes(role))
							.map((props, idx) => {
								const { Icon, label, type } = props

								return (
									<Tooltip
										content={t(label)}
										hidden={isNavOpen}
										key={`${label}-${idx}`}
										side={TOOLTIP_CONFIGS.side}
										sideOffset={TOOLTIP_CONFIGS.sideOffset}>
										<div>
											{type === "nav-link" ? (
												<NavLink className='p-3' key={`${label}:${props?.path}`} to={props.path}>
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
													hasActiveChild={props.content?.some((item) => pathname?.includes(item.path))}
													Icon={Icon}
													isNavOpen={isNavOpen}
													label={t(label)}
													openSidebar={() => dispatch(toggleNavbar(true))}>
													{props.content.map(({ label, path }) => (
														<NavLink className='p-2 ps-3 text-sm' key={`${label}:${path}`} to={path}>
															{t(label)}
														</NavLink>
													))}
												</ColapsibleNavLinks>
											)}
										</div>
									</Tooltip>
								)
							})}
					</div>
				</div>

				<Separator className='my-2 opacity-50' />

				{/* Bottom Secton */}
				<div className='flex h-max min-h-max w-full flex-col p-2'>
					<div className='flex w-full flex-col gap-2 px-[7px]'>
						<Tooltip
							content={t("navbar.language-selector.title")}
							hidden={isNavOpen}
							side={TOOLTIP_CONFIGS.side}
							sideOffset={TOOLTIP_CONFIGS.sideOffset}>
							<div>
								<ColapsibleNavLinks
									Icon={RadixIconsGlobe}
									isNavOpen={isNavOpen}
									label={t("navbar.language-selector.title")}
									openSidebar={() => dispatch(toggleNavbar(true))}>
									<Button
										active={i18n.language === "en"}
										className={`w-full justify-start text-sm text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white
											 focus-visible:ring-2 focus-visible:ring-primary-500`}
										onClick={() => changeLanguage("en")}
										size='sm'
										variant='ghost'>
										{t("navbar.language-selector.options.english")}
									</Button>
									<Button
										active={i18n.language === "ar"}
										className={`w-full justify-start text-sm text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white 
											focus-visible:ring-2 focus-visible:ring-primary-500`}
										onClick={() => changeLanguage("ar")}
										size='sm'
										variant='ghost'>
										{t("navbar.language-selector.options.arabic")}
									</Button>
								</ColapsibleNavLinks>
							</div>
						</Tooltip>
					</div>
				</div>
			</Spring>
		</ErrorBoundary>
	)
}

export default Navbar
