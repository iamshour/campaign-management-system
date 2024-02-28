//#region Import
import type { SmsSenderType } from "@/features/channels/sms-senders/types"

import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import HeroiconsPlus16Solid from "~icons/heroicons/plus-16-solid"
import { useTranslation } from "react-i18next"
//#endregion

const SmsSendersGridViewTableActions = ({ id, name }: Pick<SmsSenderType, "id" | "name">) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "table.actions" })

	return (
		<ActionsDropdown Icon={HeroiconsPlus16Solid} iconClassName='w-5 h-5'>
			<ActionsDropdown.Item
				onClick={() => {
					// eslint-disable-next-line no-console
					console.log("sender ", id, name)
				}}>
				{t("addRequest")}
			</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default SmsSendersGridViewTableActions
