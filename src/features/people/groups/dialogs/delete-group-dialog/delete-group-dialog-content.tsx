//#region Import
import type { MoveContactsToGroupBody } from "@/features/people/groups/types"

import { useDeleteGroupMutation, useMoveContactsToGroupMutation } from "@/features/people/groups/api"
import SelectGroupsPopover from "@/features/people/groups/components/select-groups-popover/select-groups-popover"
import { BackButton, Button, Footer, type OptionType } from "@/ui"
import { useDropdownStateContext } from "@/ui/dropdown/dropdown-state-context"
import { useStep } from "@/utils"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
//#endregion

export interface DeleteGroupDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	/**
	 * Group Id For the group we want to delete
	 */
	groupId: string
}

const DeleteGroupDialogContent = ({ closeDialog, groupId }: DeleteGroupDialogContentProps) => {
	const { t } = useTranslation("groups", { keyPrefix: "dialogs.delete-group" })

	const [triggerDeleteGroup, { isLoading: isDeleteLoading }] = useDeleteGroupMutation()

	const [triggerMoveContactsToGroup, { isLoading: isMoveLoading }] = useMoveContactsToGroupMutation()

	const { closeDropdown } = useDropdownStateContext()

	const [currentStep, { canGoToNextStep, canGoToPrevStep, goToNextStep, goToPrevStep }] = useStep(2)

	const [selectedGroupToMoveTo, setSelectedGroupToMoveTo] = useState<OptionType>()

	const onSuccess = (message: string) => {
		toast.success(t(message))
		closeDialog()
		closeDropdown()
	}

	const handleDelete = async () => {
		if (currentStep === 1) {
			await triggerDeleteGroup(groupId).unwrap()
			onSuccess("successMessage")
		}

		if (currentStep === 2 && selectedGroupToMoveTo?.value) {
			const body: MoveContactsToGroupBody = {
				fromGroupId: groupId,
				moveAndDelete: true,
				toGroupId: selectedGroupToMoveTo?.value,
			}

			await triggerMoveContactsToGroup(body).unwrap()
			onSuccess("successMessage")
		}
	}

	return (
		<div className='flex flex-1 flex-col justify-evenly gap-6 p-2 sm:justify-between'>
			{canGoToPrevStep && <BackButton className='absolute start-1.5 top-2' onClick={goToPrevStep} />}

			{currentStep === 1 ? (
				<p>{t("message")}</p>
			) : (
				<SelectGroupsPopover
					className='!w-full !max-w-full'
					isMulti={false}
					selection={selectedGroupToMoveTo}
					size='lg'
					updateSelection={setSelectedGroupToMoveTo}
				/>
			)}

			<Footer>
				{currentStep === 1 && (
					<Button className='sm:w-[144px]' disabled={!canGoToNextStep} onClick={goToNextStep} variant='outline'>
						{t("actions.move")}
					</Button>
				)}

				<Button
					className='sm:w-[144px]'
					disabled={currentStep === 2 && !selectedGroupToMoveTo}
					loading={isDeleteLoading || isMoveLoading}
					onClick={handleDelete}>
					{currentStep === 1 ? t("actions.delete") : t("actions.move-with-delete")}
				</Button>
			</Footer>
		</div>
	)
}

export default DeleteGroupDialogContent
