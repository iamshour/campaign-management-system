//#region Import
import toast from "react-hot-toast"

import { useUpdateSmsTemplateMutation } from "@/features/industries/api"
import IndustryForm from "@/features/industries/components/industry-form"
import type { AddNewIndustryArgs, IndustryType } from "@/features/industries/types"
import { Button } from "@/ui"
//#endregion

export interface EditIndustryDialogContentProps
	extends Pick<IndustryType, "name" | "description" | "icon" | "color" | "id"> {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const EditIndustryDialogContent = ({ onClose, id, ...formDefaultValues }: EditIndustryDialogContentProps) => {
	const [updatedIndustry, { isLoading }] = useUpdateSmsTemplateMutation()

	// tracking which button was clicked to show appropriate loader

	/**
	 * Used to send validated data from the `IndustryForm` component to the server, for updating the industry entry
	 *
	 * @param body Validated data passed back from the `IndustryForm` component
	 */

	const onSubmit = async (body: AddNewIndustryArgs) => {
		if (!body) return

		await updatedIndustry({ id, ...body })
			.unwrap()
			.then(() => {
				toast.success("Industry updated successfully")

				onClose()
			})
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
