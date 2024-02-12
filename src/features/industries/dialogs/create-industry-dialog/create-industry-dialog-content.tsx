//#region Import
import toast from "react-hot-toast"

import { useAddNewIndustryMutation } from "@/features/industries/api"
import IndustryForm from "@/features/industries/components/industry-form"
import type { AddNewIndustryArgs } from "@/features/industries/types"
import { Button } from "@/ui"
//#endregion

interface CreateIndustryDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const CreateIndustryDialogContent = ({ onClose }: CreateIndustryDialogContentProps) => {
	const [addIndustry, { isLoading }] = useAddNewIndustryMutation()

	// tracking which button was clicked to show appropriate loader

	/**
	 * Used to send validated data from the `IndustryForm` component to the server, for adding the industry entry
	 *
	 * @param body Validated data passed back from the `IndustryForm` component
	 */

	const onSubmit = async (body: AddNewIndustryArgs) => {
		if (!body) return

		await addIndustry(body)
			.unwrap()
			.then(() => {
				toast.success("Industry created successfully")

				onClose()
			})
	}

	return (
		<IndustryForm onSubmit={onSubmit}>
			<Button type='submit' loading={isLoading} disabled={isLoading} className='px-12'>
				Add
			</Button>
		</IndustryForm>
	)
}

export default CreateIndustryDialogContent
