//#region Import
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useTranslation } from "react-i18next"
//#endregion

const AdminSmsListingsTableActions = ({ id }: { id: string }) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.adminSmsListingsView.table.actions" })

	// eslint-disable-next-line no-console
	console.assert(!!id, "YO")

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item>{t("edit")}</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("block")}</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("suspend")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default AdminSmsListingsTableActions
