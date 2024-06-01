//#region Import
import useDispatch from "@/core/hooks/useDispatch"
import useSelector from "@/core/hooks/useSelector"
import reduxStore from "@/core/lib/redux-toolkit/store"
import getInitials from "@/core/utils/get-initials"
import { switchRole } from "@/features/authentication/slice"
import { Avatar, Dropdown } from "@/ui"
import { useNavigate } from "react-router-dom"
//#endregion

const onClearStorage = async () => {
	await reduxStore.persistor.purge()
	window.location.reload()
}

const UserSettingsDropdown = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const { name, role, src } = useSelector(({ auth }) => auth.user)

	const onSwitchRole = () => {
		dispatch(switchRole())
		navigate("/dashboard")
	}

	return (
		<Dropdown>
			<Dropdown.Trigger className='h-max w-[200px] justify-between px-2 py-1' variant='ghost'>
				<div className='flex gap-2'>
					<Avatar fallback={getInitials(name)} src={src} />
					<div className='flex flex-col items-start'>
						<h1 className='text-base font-bold text-black'>{name}</h1>
						<span className='text-xs text-gray-400'>{role}</span>
					</div>
				</div>
			</Dropdown.Trigger>
			<Dropdown.Content>
				<Dropdown.Item onClick={onSwitchRole}>
					<span>Switch User</span>
					<Dropdown.Shortcut>⇧⌘P</Dropdown.Shortcut>
				</Dropdown.Item>

				<Dropdown.Separator />

				<Dropdown.Item className='px-4 text-primary-600 underline hover:!text-primary-800' onClick={onClearStorage}>
					Purge Storage (DEV ONLY)
				</Dropdown.Item>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default UserSettingsDropdown
