//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import ExportFieldsDialog from "@/features/people/exports/dialogs/export-fields-dialog/export-fields-dialog"
import { Button, Skeleton } from "@/ui"
import PhUserPlus from "~icons/ph/user-plus"
import { memo, Suspense } from "react"
import { useTranslation } from "react-i18next"

import MultiEditDropdown from "./multi-edit-dropdown"
//#endregion

const GroupViewTopbar = memo(() => {
	const { t } = useTranslation("contacts")

	const selection = useSelector<Selection>((state) => selectSelection(state, "contacts-in-group"))

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && (
					<Suspense fallback={<Skeleton className='h-[36px] w-[140px]' />}>
						<MultiEditDropdown />
					</Suspense>
				)}

				<ExportFieldsDialog exportsType='contacts-in-group'>
					<Button className='px-1' variant='link'>
						{t("ui:table.actions.export.label", { count: selection === "ALL" || !selection?.length ? 2 : 1 })}
					</Button>
				</ExportFieldsDialog>
			</div>

			<Button as='link' to='./add-contacts'>
				<PhUserPlus />
				{t("table.topbar.actions.add-contact")}
			</Button>
		</div>
	)
})

GroupViewTopbar.displayName = "GroupViewTopbar"

export default GroupViewTopbar
