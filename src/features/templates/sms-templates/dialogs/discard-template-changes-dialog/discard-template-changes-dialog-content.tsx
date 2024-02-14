//#region Import
import { useLocation, useNavigate } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import { Button } from "@/ui"
//#endregion

const DiscardTemplateChangesDialogContent = () => {
	const { state } = useLocation()
	const navigate = useNavigate()

	return (
		<>
			{/* TODO: Support Translation  */}
			<p>Are you sure you want to cancel and discard the changes you made on this template?</p>
			<Button
				variant='default'
				className='ms-auto w-[150px]'
				onClick={() => navigate(state?.from || appPaths.SMS_TEMPLATES)}>
				Confirm
			</Button>
		</>
	)
}

export default DiscardTemplateChangesDialogContent
