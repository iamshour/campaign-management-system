//#region Import
import Dropdown from "@package/ui/src/dropdown"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import DeleteExportsDialog from "@/features/people/exports/dialogs/delete-exports-dialog"
import type { ContactExports } from "@/features/people/exports/types"

import ExportsTableActionsDownload from "./exports-table-actions-dowload"

import BiThreeDotsVertical from "~icons/bi/three-dots-vertical"
//#endregion

function ExportsTableActions(props: Pick<ContactExports, "id" | "fileName" | "contactExportStatus">) {
	const { t } = useTranslation("exports", { keyPrefix: "components.exportTableActions" })
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)

	const closeActionsDropDown = () => setDropDownOpen(false)

	return (
		<Dropdown open={dropDownOpen} onOpenChange={setDropDownOpen}>
			<Dropdown.Trigger showArrow={false} variant='ghost' className='h-max w-max p-1.5'>
				<BiThreeDotsVertical />
			</Dropdown.Trigger>

			<Dropdown.Content sideOffset={0} align='end'>
				<ExportsTableActionsDownload {...props} closeActionsDropDown={closeActionsDropDown}>
					<Dropdown.Item>{t("download")}</Dropdown.Item>
				</ExportsTableActionsDownload>

				<Dropdown.Separator />

				<DeleteExportsDialog id={props?.id} closeActionsDropDown={closeActionsDropDown}>
					<Dropdown.Item>{t("delete")}</Dropdown.Item>
				</DeleteExportsDialog>
			</Dropdown.Content>
		</Dropdown>
	)
}

export default ExportsTableActions
