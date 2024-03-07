//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { useDataViewContext } from "@/core/components/data-view/data-view-context"
import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import ExportOptOutSmsSendersDialog from "@/features/channels/sms-senders-management/dialogs/export-opt-out-sms-senders-dialog/export-opt-out-sms-senders-dialog"
import { Button } from "@/ui"
import PajamasImport from "~icons/pajamas/import"
import { memo } from "react"
import { useTranslation } from "react-i18next"

import OptInSmsSenderDialog from "../../dialogs/opt-in-sms-sender-dialog/opt-in-sms-sender-dialog"
//#endregion

const SmsOptedOutViewTopbar = memo(() => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.smsOptedOutSenders.table.topbar.actions" })

	const { count, dataViewKey } = useDataViewContext()

	const selection = useSelector<Selection>((state) => selectSelection(state, dataViewKey))

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && (
					<OptInSmsSenderDialog>
						<Button variant='secondary'>
							{t("optIn", { count: selection === "ALL" || selection?.length === count ? 2 : 1 })}
						</Button>
					</OptInSmsSenderDialog>
				)}

				<ExportOptOutSmsSendersDialog>
					<Button className='px-1' variant='link'>
						{t("export", { count: !selection?.length || selection === "ALL" || selection?.length === count ? 2 : 1 })}
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
