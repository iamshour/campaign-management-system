//#region Import
import { NavLink, Outlet } from "react-router-dom"
import { twMerge } from "tailwind-merge"
//#endregion

const SmsTemplatesLayout = () => {
	return (
		<div className='flex h-full w-full flex-col'>
			<div className='flex w-full items-center gap-4 px-6'>
				<SmsTemplatesNavLink to='/templates/sms-templates/my-templates'>SMS Templates</SmsTemplatesNavLink>
				<SmsTemplatesNavLink to='/templates/sms-templates/prebuilt-templates'>Prebuilt Templates</SmsTemplatesNavLink>
			</div>

			<Outlet />
		</div>
	)
}

export default SmsTemplatesLayout

const SmsTemplatesNavLink = (props: React.ComponentPropsWithoutRef<typeof NavLink>) => (
	<NavLink
		{...props}
		className={({ isActive }) =>
			twMerge(
				"w-max border-b-2 border-transparent px-4 py-3 text-[#054060] transition-basic hover:font-bold",
				isActive && "border-b-[#2daef5] font-bold"
			)
		}
	/>
)
