//#region Import
import type { SmsSenderType } from "@/features/channels/sms-senders/types"

import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useTranslation } from "react-i18next"
//#endregion

const AdminSmsSendersTableActions = ({ id, name }: Pick<SmsSenderType, "id" | "name">) => {
	const { t } = useTranslation("sms-senders")

	// eslint-disable-next-line no-console
	console.assert(!!id || !!name, "YO")

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item>{t("table.actions.addRequest")}</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("table.actions.viewAllTypes")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default AdminSmsSendersTableActions
