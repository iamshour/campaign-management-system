//#region Import
import GroupsEmptySvg from "@/assets/groups-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const SegmentsEmptyView = () => {
	const { t } = useTranslation("segments")

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
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("views.emptyView.headline")}</h3>
				<p className='mb-6 text-center'>{t("views.emptyView.message")}</p>
				<div className='flex-wrap gap-8 flex-center'>
					<Button className='min-w-[200px]' size='default'>
						{t("table.toolbar.actions.create-segment")}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SegmentsEmptyView
