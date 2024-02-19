//#region Import
import { Suspense } from "react"
import { useTranslation } from "react-i18next"

import useSelector from "@/core/hooks/useSelector"
import type { DataGridState } from "@/core/slices/data-grid-slice/types"
import ExportFieldsDialog from "@/features/people/exports/dialogs/export-fields-dialog/export-fields-dialog"
import { Button, Skeleton } from "@/ui"

import MultiEditDropdown from "./multi-edit-dropdown"

import PhUserPlus from "~icons/ph/user-plus"
//#endregion

const GroupViewTopbar = () => {
	const { t } = useTranslation("contacts")

	const { selection } = useSelector<DataGridState<"contacts-in-group">>(({ dataGrid }) => dataGrid["contacts-in-group"])

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && (
					<Suspense fallback={<Skeleton className='h-[36px] w-[140px]' />}>
						<MultiEditDropdown />
					</Suspense>
				)}

				<ExportFieldsDialog exportsType='contacts-in-group'>
					<Button variant='link' className='px-1'>
						{t("ui:table.actions.export.label", { count: selection === "ALL" || !selection?.length ? 2 : 1 })}
					</Button>
				</ExportFieldsDialog>
			</div>

			<Button as='link' to='./add-contacts'>
				<PhUserPlus />
				{t("table.toolbar.actions.add-contact")}
			</Button>
		</div>
	)
}

export default GroupViewTopbar
