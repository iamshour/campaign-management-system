//#region Import
import { twMerge } from "@blueai/ui"
import { NavLink, Outlet, useLocation } from "react-router-dom"
//#endregion

const SmsTemplatesLayout = () => {
	const { pathname } = useLocation()

	console.log(pathname)

	return (
		<div className='flex h-full flex-col'>
			<div className='flex w-full items-center gap-4 p-4'>
				<NavLink
					to='/templates/sms-templates/my-templates'
					className={({ isActive }) =>
						twMerge(
							"bg-primary-30/50 w-max rounded-lg border px-4 py-2 transition-basic",
							isActive && "bg-primary-50/100"
						)
					}>
					SMS Templates
				</NavLink>
				<NavLink
					to='/templates/sms-templates/prebuilt-templates'
					className={({ isActive }) =>
						twMerge(
							"bg-primary-30/50 w-max rounded-lg border px-4 py-2 transition-basic",
							isActive && "bg-primary-50/100"
						)
					}>
					Prebuilt Templates
				</NavLink>
			</div>

			<Outlet />
		</div>
	)
}

export default SmsTemplatesLayout
