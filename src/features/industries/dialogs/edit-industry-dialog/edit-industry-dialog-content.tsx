//#region Import
import toast from "react-hot-toast"

import { useUpdateIndustryMutation } from "@/features/industries/api"
import IndustryForm from "@/features/industries/components/industry-form"
import type { AddNewIndustryBody, IndustryType } from "@/features/industries/types"
import { Button } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
//#endregion

export interface EditIndustryDialogContentProps
	extends Pick<IndustryType, "id" | "name" | "description" | "icon" | "color"> {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void
}

const EditIndustryDialogContent = ({ closeDialog, id, ...formDefaultValues }: EditIndustryDialogContentProps) => {
	const [triggerUpdateIndustry, { isLoading }] = useUpdateIndustryMutation()

	const { closeDropdown } = useDropdownStateContext()

	/**
	 * Used to send validated data from the `IndustryForm` component to the server, for updating the industry entry
	 *
	 * @param body Validated data passed back from the `IndustryForm` component
	 */
	const onSubmit = async (body: AddNewIndustryBody) => {
		if (!body) return

		await triggerUpdateIndustry({ id, ...body }).unwrap()

		toast.success("Industry updated successfully")
		closeDialog()
		closeDropdown()
	}

	return (
		<IndustryForm onSubmit={onSubmit} defaultValues={formDefaultValues}>
			<Button type='submit' loading={isLoading} disabled={isLoading} className='px-12'>
				Save
			</Button>
		</IndustryForm>
	)
}

export default EditIndustryDialogContent
