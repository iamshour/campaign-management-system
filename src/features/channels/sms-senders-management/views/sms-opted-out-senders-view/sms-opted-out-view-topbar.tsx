//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import ExportOptOutSmsSendersDialog from "@/features/channels/sms-senders-management/dialogs/export-opt-out-sms-senders-dialog/export-opt-out-sms-senders-dialog"
import { Button } from "@/ui"
import PajamasImport from "~icons/pajamas/import"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const SmsOptedOutViewTopbar = memo(() => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.smsOptedOutSenders.table.topbar.actions" })

	const selection = useSelector<Selection>((state) => selectSelection(state, "contacts"))

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && (
					<Button variant='secondary'>
						{t("optIn", { count: selection === "ALL" || !selection?.length ? 2 : 1 })}
					</Button>
				)}

				<ExportOptOutSmsSendersDialog>
					<Button className='px-1' variant='link'>
						{t("export", { count: selection === "ALL" || !selection?.length ? 2 : 1 })}
					</Button>
				</ExportOptOutSmsSendersDialog>
			</div>

			<Button variant='outline'>
				<PajamasImport />
				{t("import")}
			</Button>
		</div>
	)
})

SmsOptedOutViewTopbar.displayName = "SmsOptedOutViewTopbar"

export default SmsOptedOutViewTopbar
