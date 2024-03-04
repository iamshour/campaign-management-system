//#region Import
import type { SmsSenderType } from "@/features/channels/sms-senders/types"

import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
//#endregion

const SmsSendersListViewTableActions = ({ id, name }: Pick<SmsSenderType, "id" | "name">) => {
	const { t } = useTranslation("sms-senders", { keyPrefix: "table.actions" })

	const navigate = useNavigate()

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item
				onClick={() => {
					// eslint-disable-next-line no-console
					console.log("sender ", id, name)
				}}>
				{t("addRequest")}
			</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item onClick={() => navigate(id)}>{t("viewAllTypes")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default SmsSendersListViewTableActions
