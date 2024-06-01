//#region Import
import type { CreateSegmentBody, SegmentConditionType } from "@/features/people/segments/types"

import { useUpdateSegmentMutation } from "@/features/people/segments/api"
import SegmentsFunnelEditable from "@/features/people/segments/components/segments-funnel-editable/segments-funnel-editable"
import { areConditionsValid } from "@/features/people/segments/utils"
import { Button, Spinner, Tooltip } from "@/ui"
import MdiFileDocument from "~icons/mdi/file-document"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import type { SegmentSelectionRenderedViewProps } from "./segment-selection-tab"

import { useAdvancedFiltersDialogContext } from "../advanced-filters-dialog-context"
//#endregion

const SegmentConditionsEditContent = ({ segment, setView }: SegmentSelectionRenderedViewProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters.segment" })

	const { selectedSegmentOption } = useAdvancedFiltersDialogContext()

	const [triggerUpdateSegment, { isLoading: isUpdateSegmentLoading }] = useUpdateSegmentMutation()

	const [editableConditions, setEditableConditions] = useState<SegmentConditionType[]>(segment?.conditions)

	const areEditableConditionsValid = useMemo(() => areConditionsValid(editableConditions), [editableConditions])

	/**
	 * Called When user saves changes when finished editing a segment.
	 */
	const onSaveChanges = async () => {
		if (!areEditableConditionsValid || !selectedSegmentOption) return

		const transformedBody: CreateSegmentBody = {
			contactSegmentConditionList: editableConditions?.map((condition) => ({
				contactSegmentRuleList: condition.rules.map((rule) => ({
					contactSegmentId: rule?.segment?.value,
					contactSegmentRuleAttribute: rule?.attribute,
					contactSegmentRuleCondition: rule?.condition,
					country: rule?.country,
					groupId: rule?.group?.value,
					id: rule?.id,
					specification: rule?.specification,
				})),
				id: condition?.id,
			})),
			description: segment.description || "",
			name: segment.name,
		}

		await triggerUpdateSegment({ ...transformedBody, id: segment.id }).unwrap()

		toast.success(t("editSegment.saveSuccessMessage"))
		setView("viewSegmentConditions")
	}

	return (
		<div className='relative flex flex-1 flex-col gap-4 overflow-hidden rounded-xl bg-[#F7F7F7]'>
			<div className='flex w-full flex-col overflow-y-auto'>
				<div className='flex flex-row'>
					<div
						className={`flex w-full flex-1 items-start justify-start gap-4 prevent-selection [&>svg:nth-of-type(2)]:me-4 [&>svg:nth-of-type(2)]:ms-auto 
					[&>svg:nth-of-type(2)]:h-6 [&>svg:nth-of-type(2)]:w-6 [&>svg:nth-of-type(2)]:self-center`}>
						<MdiFileDocument className='text-xl text-primary-600' />

						<div className='flex flex-col items-start gap-1.5'>
							<h3 className='text-xl font-bold'>{t(`title`)}</h3>
							<h4 className='text-xl font-normal text-[#545454]'>{t(`editSegmentSubtitle`)}</h4>
						</div>
					</div>

					<div className='absolute right-[30px] z-10 flex flex-row items-center rounded-lg bg-[#F7F7F7] p-2'>
						<Button
							className='h-max px-1.5 py-0 pb-0.5 text-primary-600 underline hover:bg-transparent hover:text-primary-900'
							disabled={isUpdateSegmentLoading}
							onClick={() => setView("viewSegmentConditions")}
							size='sm'
							type='button'
							variant='text'>
							{t(`editSegment.cancelChanges`)}
						</Button>

						<Button
							className='h-max px-1.5 py-0 pb-0.5 text-primary-600 underline hover:bg-transparent hover:text-primary-900'
							disabled={isUpdateSegmentLoading}
							onClick={onSaveChanges}
							size='sm'
							type='button'
							variant='text'>
							{t(`editSegment.saveChanges`)}
						</Button>

						{isUpdateSegmentLoading && (
							<div className='h-full w-full pe-3 flex-center' key='savingSpinner'>
								<Spinner size='sm' />
							</div>
						)}

						<Tooltip align='end' content={t("editSegment.tooltip")} key='tooltip' side='top' sideOffset={10}>
							<span className='w-max'>
								<MdiInformationVariantCircle className='text-lg text-[#054060]' />
							</span>
						</Tooltip>
					</div>
				</div>

				<div className='mt-4 flex flex-col gap-6'>
					<SegmentsFunnelEditable
						conditions={editableConditions}
						disabled={isUpdateSegmentLoading}
						setConditions={setEditableConditions}
					/>
				</div>
			</div>
		</div>
	)
}

export default SegmentConditionsEditContent
