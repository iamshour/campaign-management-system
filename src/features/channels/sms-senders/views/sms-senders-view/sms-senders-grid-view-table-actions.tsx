//#region Import
import type { SmsSenderType } from "@/features/channels/sms-senders/types"

import SmsSenderRequestDialog from "@/features/channels/sms-senders/dialogs/sms-sender-request-dialog/sms-sender-request-dialog"
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { useTranslation } from "react-i18next"
//#endregion

const SmsSendersGridViewTableActions = ({ name }: Pick<SmsSenderType, "name">) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "table.actions" })

	return (
		<ActionsDropdown Icon={HeroiconsPlus16Solid} iconClassName='w-5 h-5'>
			<SmsSenderRequestDialog defaultValues={{ sender: name }}>
				<ActionsDropdown.Item>{t("addRequest")}</ActionsDropdown.Item>
			</SmsSenderRequestDialog>
		</ActionsDropdown>
	)
}

export default SmsSendersGridViewTableActions
