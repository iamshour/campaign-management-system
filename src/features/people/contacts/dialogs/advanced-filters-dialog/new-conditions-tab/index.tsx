//#region Import
import { Button } from "@blueai/ui"
import { useTranslation } from "react-i18next"

import SegmentsFunnelEditable from "@/features/people/segments/components/segments-funnel-editable"

import { useAdvancedFiltersDialogContext } from "../advanced-filters-dialog-context"

import MdiFileDocument from "~icons/mdi/file-document"
//#endregion

const NewConditionsTab = () => {
	const { t } = useTranslation()

	const { conditions, setConditions, clearConditions, areContextConditionsEmpty } = useAdvancedFiltersDialogContext()

	return (
		<>
			<p>{t(`contacts:dialogs.advancedFilters.segment.enterSegmentDetails`)}</p>
			<div className='flex flex-1 flex-col gap-4 overflow-hidden rounded-xl bg-[#F7F7F7] p-4'>
				<div className='flex w-full flex-col overflow-y-auto'>
					<div className='flex flex-row'>
						<div className='flex w-full flex-1 items-start justify-start gap-4 prevent-selection [&>svg:nth-of-type(2)]:me-4 [&>svg:nth-of-type(2)]:ms-auto [&>svg:nth-of-type(2)]:h-6 [&>svg:nth-of-type(2)]:w-6 [&>svg:nth-of-type(2)]:self-center'>
							<MdiFileDocument className='text-xl text-primary-600' />

							<div className='flex flex-col items-start gap-1.5'>
								<h3 className='text-xl font-bold'>{t(`segments:views.editableSegmentView.items.conditions.title`)}</h3>
								<h4 className='text-xl font-normal text-[#545454]'>
									{t(`segments:views.editableSegmentView.items.conditions.description.createSegment`)}
								</h4>
							</div>
						</div>

						<Button
							type='button'
							className='h-max px-1.5 py-0 pb-0.5 text-primary-600 underline hover:bg-transparent hover:text-primary-900'
							variant='text'
							size='sm'
							disabled={areContextConditionsEmpty}
							onClick={clearConditions}>
							{t(`contacts:dialogs.advancedFilters.actions.clearFilter`)}
						</Button>
					</div>

					<SegmentsFunnelEditable conditions={conditions} setConditions={setConditions} />
				</div>
			</div>
		</>
	)
}

export default NewConditionsTab
