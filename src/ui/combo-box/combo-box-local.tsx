//#region Import
import { useState } from "react"

import Dropdown from "../dropdown/dropdown"
//#endregion

// TODO: THIS COMPONENT IS JUST FOR TESTING FOR NOW

const ComboBoxLocal = () => {
	const [showStatus, setShowStatus] = useState(false)

	return (
		<Dropdown>
			<Dropdown.Trigger>Trigger Me Here!</Dropdown.Trigger>
			<Dropdown.Content className='w-56'>
				<Dropdown.Label>Appearance</Dropdown.Label>
				<Dropdown.Separator />
				<Dropdown.CheckboxItem
					checked={showStatus}
					onClick={(e) => {
						e.preventDefault()
						setShowStatus((prev) => !prev)
					}}>
					Status Bar
				</Dropdown.CheckboxItem>
				<Dropdown.CheckboxItem disabled>Activity Bar</Dropdown.CheckboxItem>
				<Dropdown.CheckboxItem>Panel</Dropdown.CheckboxItem>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default ComboBoxLocal
