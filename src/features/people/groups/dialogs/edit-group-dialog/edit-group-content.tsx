//#region Import
import type { ErrorObject } from "@/core/lib/redux-toolkit/helpers"
import type { GroupSchemaType } from "@/features/people/groups/schemas/group-schema"
import type { Group } from "@/features/people/groups/types"

import { useEditGroupMutation } from "@/features/people/groups/api"
import GroupForm from "@/features/people/groups/components/group-form"
import { Button, type UseFormReturn } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface EditGroupContentProps
	extends Pick<Group, "description" | "groupId" | "groupName">,
		Pick<React.ComponentPropsWithoutRef<typeof GroupForm>, "size"> {
	/**
	 *  Callback function used to close popover/Dialog
	 */
	closeDialog: () => void
}

const EditGroupContent = ({ closeDialog, groupId, size, ...defaultValues }: EditGroupContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "components.groupsPopover.createNewPopover" })

	const { closeDropdown } = useDropdownStateContext()

	const [triggerEditGroupMutation, { isLoading }] = useEditGroupMutation()

	const onSubmit = async (data: GroupSchemaType, form: UseFormReturn<GroupSchemaType>) => {
		await triggerEditGroupMutation({ description: data?.groupDescription, groupId, name: data?.groupName })
			.unwrap()
			.then(() => {
				toast.success(t("editSuccessMessage"))

				closeDialog()
				closeDropdown()
			})
			.catch((error: ErrorObject) => {
				// At this moment, we're only catching one specific error for group name that already exist
				// Can be used to catch other errors later on
				if (error?.data?.statusCode !== 4050300) return

				form.setError("groupName", { message: error.data.message })
			})
	}

	return (
		<GroupForm defaultValues={defaultValues} onSubmit={onSubmit} size={size}>
			<Button className='ms-auto w-full shrink-0 px-8 sm:w-max' loading={isLoading} type='submit'>
				Save
			</Button>
		</GroupForm>
	)
}

export default EditGroupContent
