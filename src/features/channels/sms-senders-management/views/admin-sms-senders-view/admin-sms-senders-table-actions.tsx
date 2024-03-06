//#region Import
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useTranslation } from "react-i18next"
//#endregion

const AdminSmsSendersTableActions = ({ id }: { id: string }) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.adminSmsSendersView.table.actionsCell" })

	// eslint-disable-next-line no-console
	console.assert(!!id, "YO")

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item>{t("addList")}</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default AdminSmsSendersTableActions
