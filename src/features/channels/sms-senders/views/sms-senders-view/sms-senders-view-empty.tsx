//#region Import
import type { SmsChannelTypeOption } from "@/features/channels/sms-senders/types"

import SmsSendersEmptySvg from "@/assets/sms-senders-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import ActivateSmsDialog from "@/features/channels/sms-senders/dialogs/activate-sms-dialog/activate-sms-dialog"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

interface SmsSendersEmptyViewProps {
	channelType: SmsChannelTypeOption
}

const SmsSendersViewEmpty = ({ channelType }: SmsSendersEmptyViewProps) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "views.emptyView" })

	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints
				labels={[
					"Lorem ipsum dolor sit amet.",
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
				]}
			/>

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<SmsSendersEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("title")}</h3>
				<p className='mb-6 text-center'>{t("text")}</p>

				<ActivateSmsDialog channelType={channelType}>
					<Button className='h-min px-10 py-3'>{t(`buttons.${channelType}`)}</Button>
				</ActivateSmsDialog>
			</div>
		</div>
	)
}

export default SmsSendersViewEmpty
