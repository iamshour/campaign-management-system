//#region Import
import { Button } from "@/ui"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const SmsSendersViewTopbar = memo(() => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "table.actions" })

	return (
		<div className='flex w-full items-end justify-end'>
			<Button>
				<HeroiconsPlus16Solid />
				{t("requestSender")}
			</Button>
		</div>
	)
})

SmsSendersViewTopbar.displayName = "SmsSendersViewTopbar"

export default SmsSendersViewTopbar
