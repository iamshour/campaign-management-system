//#region Import
import SmsSenderRequestDialog from "@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog"
import { Button } from "@/ui"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const SmsSendersViewTopbar = memo(() => {
	const { t } = useTranslation("sms-senders")

	return (
		<div className='flex w-full items-end justify-end'>
			<SmsSenderRequestDialog formType='newRequest'>
				<Button>
					<HeroiconsPlus16Solid />
					{t("table.actions.requestSender")}
				</Button>
			</SmsSenderRequestDialog>
		</div>
	)
})

SmsSendersViewTopbar.displayName = "SmsSendersViewTopbar"

export default SmsSendersViewTopbar
