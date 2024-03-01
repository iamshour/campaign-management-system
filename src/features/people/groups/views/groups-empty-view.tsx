//#region Import
import GroupsEmptySvg from "@/assets/groups-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import CreateGroupDialog from "@/features/people/groups/dialogs/create-group-dialog/create-group-dialog"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const GroupsEmptyView = () => {
	const { t } = useTranslation("groups")

	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints
				labels={[
					"You can click on the import section.",
					"You can create new contacts or import your own list of contacts to start sending you campaigns.",
				]}
			/>

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<GroupsEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>You don&apos;t have groups yet</h3>
				<p className='mb-6 text-center'>Create new group to collect you contacts</p>
				<div className='flex-wrap gap-8 flex-center'>
					<CreateGroupDialog>
						<Button className='min-w-[200px]' size='default'>
							{t("table.toolbar.actions.create-group")}
						</Button>
					</CreateGroupDialog>
				</div>
			</div>
		</div>
	)
}

export default GroupsEmptyView
