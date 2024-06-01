//#region Import
import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover/select-tags-popover"
import SelectGroupsWithCreatePopover from "@/features/people/groups/components/select-groups-with-create-popover"
import { Button, Checkbox, Label, type OptionType } from "@/ui"
import { getListOfKey } from "@/utils"
import RadixIconsReset from "~icons/radix-icons/reset"
import { lazy, useCallback } from "react"
import { useTranslation } from "react-i18next"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"

const MappingTable = lazy(() => import("./mapping-table"))
//#endregion

const MappingStep = () => {
	const { t } = useTranslation("contacts")

	const {
		data: { columnNameToIndexMapping, fileHasHeader, groups, previewRows, tags },
		updateData,
	} = useImportContactsDialogContext()

	const onCreateGroupSuccess = useCallback(
		(newGroup: OptionType) => {
			if (!groups || groups?.length >= 10) return

			updateData((prev) => ({ ...prev, groups: [...groups, newGroup] }))
		},
		[groups, updateData]
	)

	return (
		<div className='flex h-full flex-col gap-1 overflow-hidden'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-1'>
					<Checkbox
						checked={fileHasHeader}
						id='has-headers'
						onCheckedChange={(checked) => updateData({ fileHasHeader: Boolean(checked) })}
					/>
					<Label className='pb-0 font-bold' htmlFor='has-headers'>
						{t("dialogs.importContacts.fieldsMapping.labels.checkboxLabel")}
					</Label>
				</div>

				<Button
					className=''
					disabled={!columnNameToIndexMapping}
					onClick={() => updateData({ columnNameToIndexMapping: undefined })}
					size='xs'
					variant='ghost'>
					{t("dialogs.importContacts.fieldsMapping.buttons.resetMapping")}
					<RadixIconsReset />
				</Button>
			</div>

			{previewRows?.length ? (
				<MappingTable />
			) : (
				<div className='h-full w-full rounded-md bg-white p-2 text-gray-400 flex-center'>
					{t("dialogs.importContacts.fieldsMapping.labels.invalid-file")}
				</div>
			)}

			<div className='mt-3 w-full space-y-5 py-1'>
				<p className='col-span-2 text-sm'>{t("dialogs.importContacts.fieldsMapping.labels.addTagsGroups")}</p>

				<div className='flex flex-wrap gap-6'>
					<SelectGroupsWithCreatePopover
						className='w-[340px]'
						isMulti
						label={t("groups:components.groupsPopover.label")}
						maxLimit={10}
						onCreateSuccess={onCreateGroupSuccess}
						selection={groups || []}
						updateSelection={(updatedGroups) =>
							!!groups && groups?.length < 10 && updateData({ groups: updatedGroups })
						}
					/>
					<SelectTagsPopover
						className='w-[340px]'
						creatable
						isMulti
						label={t("components.tagsPopover.label")}
						maxLimit={10}
						selection={tags?.map((value) => ({ label: value, value })) || []}
						updateSelection={(updatedtags) =>
							!!tags && tags?.length < 10 && updateData({ tags: getListOfKey(updatedtags, "value") })
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default MappingStep
