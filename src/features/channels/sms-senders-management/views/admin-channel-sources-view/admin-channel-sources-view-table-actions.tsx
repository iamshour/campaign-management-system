//#region Import
import ActionsDropdown from "@/ui/dropdown/actions-dropdown"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
//#endregion

const AdminChannelSourcesViewTableActions = ({ id }: { id: string }) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "views.adminChannelSourcesView.table.actionsCell" })

	const navigate = useNavigate()

	const { pathname } = useLocation()

	return (
		<ActionsDropdown>
			<ActionsDropdown.Item onClick={() => navigate(`${id}/add-listings`, { state: { from: pathname } })}>
				{t("addList")}
			</ActionsDropdown.Item>

			<ActionsDropdown.Separator />

			<ActionsDropdown.Item>{t("delete")}</ActionsDropdown.Item>
		</ActionsDropdown>
	)
}

export default AdminChannelSourcesViewTableActions
