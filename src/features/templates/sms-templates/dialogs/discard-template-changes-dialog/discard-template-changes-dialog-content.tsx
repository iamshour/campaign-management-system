//#region Import
import appPaths from "@/core/constants/app-paths"
import { Button } from "@/ui"
import { useLocation, useNavigate } from "react-router-dom"
//#endregion

const DiscardTemplateChangesDialogContent = () => {
	const { state } = useLocation()

	const navigate = useNavigate()

	return (
		<>
			{/* TODO: Support Translation  */}
			<p>Are you sure you want to cancel and discard the changes you made on this template?</p>
			<Button
				className='ms-auto w-[150px]'
				onClick={() => navigate(state?.from || appPaths.SMS_TEMPLATES)}
				variant='default'>
				Confirm
			</Button>
		</>
	)
}

export default DiscardTemplateChangesDialogContent
