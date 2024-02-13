//#region Import
import { useTranslation } from "react-i18next"

import CreateIndustryDialog from "@/features/industries/dialogs/create-industry-dialog/create-industry-dialog"
import { Button } from "@/ui"

import PhUserPlus from "~icons/ph/user-plus"
//#endregion

const IndustriesViewTopBar = () => {
	const { t } = useTranslation("industries")

	return (
		<div className='flex w-full items-end justify-end py-4'>
			<CreateIndustryDialog>
				<Button>
					<PhUserPlus />
					{t("table.toolbar.actions.create-industry")}
				</Button>
			</CreateIndustryDialog>
		</div>
	)
}

export default IndustriesViewTopBar
