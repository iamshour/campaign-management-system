//#region Import
import { useTranslation } from "react-i18next"

import { Button } from "@/ui"

import PhPlusBold from "~icons/ph/plus-bold"
//#endregion

const IndustriesViewTopBar = () => {
	const { t } = useTranslation("industries")

	return (
		<div className='flex w-full items-end justify-end py-4'>
			{/* TODO: To be wrapped with `CreateIndustryDialog` */}
			{/* </CreateIndustryDialog> */}
			<Button>
				<PhPlusBold />
				{t("table.toolbar.actions.create-industry")}
			</Button>
			{/* </CreateIndustryDialog> */}
		</div>
	)
}

export default IndustriesViewTopBar
