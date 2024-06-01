//#region Import
import CreateIndustryDialog from "@/features/industries/dialogs/create-industry-dialog/create-industry-dialog"
import { Button } from "@/ui"
import PhUserPlus from "~icons/ph/user-plus"
import { memo } from "react"
import { useTranslation } from "react-i18next"
//#endregion

const IndustriesViewTopBar = memo(() => {
	const { t } = useTranslation("industries")

	return (
		<div className='flex w-full items-end justify-end'>
			<CreateIndustryDialog>
				<Button>
					<PhUserPlus />
					{t("table.topbar.actions.create-industry")}
				</Button>
			</CreateIndustryDialog>
		</div>
	)
})

IndustriesViewTopBar.displayName = "IndustriesViewTopBar"

export default IndustriesViewTopBar
