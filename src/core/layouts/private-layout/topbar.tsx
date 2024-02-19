//#region Import
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import userAvatar from "@/assets/user-avatar.png"
import reduxStore from "@/core/lib/redux-toolkit/store"
import getInitials from "@/core/utils/get-initials"
import { Avatar, Button, Dropdown, SearchInput, Separator, Tooltip } from "@/ui"

import LucideChevronRight from "~icons/lucide/chevron-right"
import RadixIconsBell from "~icons/radix-icons/bell"
import RadixIconsGear from "~icons/radix-icons/gear"
//#endregion

const user = {
	name: "John Dow",
	position: "Super Admin",
	src: userAvatar,
}

const Topbar = () => {
	const { t } = useTranslation("common")
	const navigate = useNavigate()

	const onClearStorage = async () => {
		try {
			await reduxStore.persistor.purge()
			window.location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='z-20 flex h-max w-full items-center justify-between gap-2 border-b border-b-gray-300/50 bg-[#edf3f7] px-4 py-2'>
			{/* TODO: REPLCAE WITH BREADCRUMB COMPONENT FROM `@package/Ui`  */}
			<div className='flex items-center gap-4'>
				<Button variant='link' size='sm' as='button' onClick={() => navigate(-1)}>
					Back (Test)
				</Button>

				<div className='flex h-full items-center'>
					<h2 className='truncate text-base font-medium text-gray-500'>
						People <LucideChevronRight className='inline' />{" "}
						<span className='cursor-pointer transition-basic hover:text-primary-600'>Contacts</span>
					</h2>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<SearchInput
					className='w-max'
					inputClassName='ring-[#054060]/30'
					onChange={(searchTerm) => console.log(searchTerm)}
					placeholder={t("top-bar.search")}
				/>

				<Tooltip>
					<Tooltip.Trigger asChild>
						<Button variant='ghost' className='h-max w-max p-3'>
							<RadixIconsGear className='h-[22px] w-[22px] shrink-0' />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content content='Settings' sideOffset={8} side='bottom' />
				</Tooltip>

				<Tooltip>
					<Tooltip.Trigger asChild>
						<Button variant='ghost' className='h-max w-max p-3'>
							<RadixIconsBell className='h-[22px] w-[22px] shrink-0' />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content content='Notifications' sideOffset={8} side='bottom' />
				</Tooltip>

				<Separator orientation='vertical' className='h-10 bg-slate-400/60' />

				<Dropdown>
					<Dropdown.Trigger className='h-max w-[200px] justify-between px-2 py-1' variant='ghost'>
						<div className='flex gap-2'>
							<Avatar src={user.src} fallback={getInitials(user.name)} />
							<div className='flex flex-col items-start'>
								<h1 className='text-base font-bold text-black'>{user.name}</h1>
								<span className='text-xs text-gray-400'>{user.position}</span>
							</div>
						</div>
					</Dropdown.Trigger>
					<Dropdown.Content>
						<Dropdown.Item>
							<span>{t("top-bar.user-dropdown.profile")}</span>
							<Dropdown.Shortcut>⇧⌘P</Dropdown.Shortcut>
						</Dropdown.Item>
						<Dropdown.Separator />
						<Dropdown.Item>
							<span>{t("top-bar.user-dropdown.logout")}</span>
							<Dropdown.Shortcut>⇧⌘L</Dropdown.Shortcut>
						</Dropdown.Item>

						<Dropdown.Item>
							<Button variant='link' onClick={onClearStorage}>
								Purge Storage (DEV ONLY)
							</Button>
						</Dropdown.Item>
					</Dropdown.Content>
				</Dropdown>
			</div>
		</div>
	)
}

export default Topbar
