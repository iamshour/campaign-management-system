//#region Import
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { Button, SearchInput, Separator, Tooltip } from "@/ui"

import UserSettingsDropdown from "./user-settings-dropdown"

import LucideChevronRight from "~icons/lucide/chevron-right"
import RadixIconsBell from "~icons/radix-icons/bell"
import RadixIconsGear from "~icons/radix-icons/gear"
//#endregion

const Topbar = () => {
	const { t } = useTranslation("common")
	const navigate = useNavigate()

	return (
		<div className='z-20 flex h-max w-full items-center justify-between gap-2 border-b border-b-gray-300/50 bg-[#edf3f7] px-4 py-2'>
			{/* TODO: REPLCAE WITH BREADCRUMB COMPONENT FROM `@package/Ui`  */}
			<div className='flex items-center gap-4'>
				<Button variant='link' size='sm' onClick={() => navigate(-1)}>
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

				<UserSettingsDropdown />
			</div>
		</div>
	)
}

export default Topbar