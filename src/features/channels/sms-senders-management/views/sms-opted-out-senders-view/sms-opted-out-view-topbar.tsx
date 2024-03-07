//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import { Button } from "@/ui"
import PajamasImport from "~icons/pajamas/import"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const SmsOptedOutViewTopbar = memo(() => {
	const { t } = useTranslation("contacts")

	const selection = useSelector<Selection>((state) => selectSelection(state, "contacts"))

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && <div>Handling custom viewable button</div>}

				{/* <ExportFieldsDialog exportsType='contacts'> */}
				<Button className='px-1' variant='link'>
					{t("ui:table.actions.export.label", { count: selection === "ALL" || !selection?.length ? 2 : 1 })}
				</Button>
			</div>

			<Button variant='outline'>
				<PajamasImport />
				{t("table.toolbar.actions.import")}
			</Button>
		</div>
	)
})

SmsOptedOutViewTopbar.displayName = "SmsOptedOutViewTopbar"

export default SmsOptedOutViewTopbar
