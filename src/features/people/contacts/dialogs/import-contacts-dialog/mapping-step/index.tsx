//#region Import
import { Button, Checkbox, Label, type OptionType } from "@/ui"
import { getListOfKey } from "@/utils"
import { lazy, useCallback } from "react"
import { useTranslation } from "react-i18next"

import SelectTagsPopover from "@/features/people/contacts/components/select-tags-popover"
import SelectGroupsWithCreatePopover from "@/features/people/groups/components/select-groups-with-create-popover"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"

import RadixIconsReset from "~icons/radix-icons/reset"

const MappingTable = lazy(() => import("./mapping-table"))
//#endregion

const MappingStep = () => {
	const { t } = useTranslation("contacts")
	const {
		data: { fileHasHeader, columnNameToIndexMapping, previewRows, groups, tags },
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
						id='has-headers'
						checked={fileHasHeader}
						onCheckedChange={(checked) => updateData({ fileHasHeader: Boolean(checked) })}
					/>
					<Label htmlFor='has-headers' className='pb-0 font-bold'>
						{t("dialogs.importContacts.fieldsMapping.labels.checkboxLabel")}
					</Label>
				</div>

				<Button
					onClick={() => updateData({ columnNameToIndexMapping: undefined })}
					disabled={!columnNameToIndexMapping}
					className=''
					variant='ghost'
					size='xs'>
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
						// maxLimit={10}
						isMulti
						className='w-[340px]'
						selection={groups || []}
						updateSelection={(updatedGroups) =>
							!!groups && groups?.length < 10 && updateData({ groups: updatedGroups })
						}
						onCreateSuccess={onCreateGroupSuccess}
					/>
					<SelectTagsPopover
						// creatable
						// maxLimit={10}
						isMulti
						className='w-[340px]'
						selection={tags?.map((value) => ({ value, label: value })) || []}
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
