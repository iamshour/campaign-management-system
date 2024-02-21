//#region Import
import { useTranslation } from "react-i18next"

import CreateGroupDialog from "@/features/people/groups/dialogs/create-group-dialog/create-group-dialog"
import { Button } from "@/ui"

import PhPlusBold from "~icons/ph/plus-bold"
//#endregion

const GroupsViewTopBar = () => {
	const { t } = useTranslation("groups")

	return (
		<div className='flex w-full items-end justify-end py-4'>
			<CreateGroupDialog>
				<Button>
					<PhPlusBold />
					{t("table.toolbar.actions.create-group")}
				</Button>
			</CreateGroupDialog>
		</div>
	)
}

export default GroupsViewTopBar
