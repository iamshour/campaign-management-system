//#region Import
import { Button, Footer,
	RadioGroup,
	Skeleton } from "@blueai/ui"
import { Suspense, lazy, useMemo } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import useDispatch from "@/core/hooks/useDispatch"
import { updateFilters } from "@/core/slices/advanced-table-slice"
import CreateSegmentPopover from "@/features/people/segments/components/create-segment-popover"
import { areConditionsValid } from "@/features/people/segments/utils"

import { useAdvancedFiltersDialogContext } from "./advanced-filters-dialog-context"
import type { AdvancedFiltersTab } from "./types"

const NewConditionsTab = lazy(() => import("./new-conditions-tab"))
const SegmentSelectionTab = lazy(() => import("./segment-selection-tab"))
//#endregion

interface AdvancedFiltersDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}

const AdvancedFiltersDialogContent = ({ onClose }: AdvancedFiltersDialogContentProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters" })

	const dispatch = useDispatch()
	const {
		selectedTab,
		onTabChange,
		areContextConditionsEmpty,
		conditions,
		selectedSegmentOption,
		segmentSelectionTabView,
	} = useAdvancedFiltersDialogContext()

	const areContextConditionsValid = useMemo(() => areConditionsValid(conditions), [conditions])

	const onFormSubmit = () => {
		if (areContextConditionsEmpty) {
			dispatch(updateFilters({ contacts: { advancedFilters: undefined } }))
		}

		if (areContextConditionsValid) {
			if (selectedTab == "newConditions") {
				dispatch(updateFilters({ contacts: { advancedFilters: { segment: undefined, conditions } } }))
			}

			// TODO: handle submit in segment selection tab
			if (!!selectedSegmentOption && selectedTab == "segmentSelection") {
				dispatch(
					updateFilters({
						contacts: {
							advancedFilters: { segment: selectedSegmentOption, conditions },
						},
					})
				)
			}
		}

		onClose()

		toast.success(t("appliedSuccessMessage"))
	}

	return (
		<form onSubmit={(e) => e.preventDefault} className='flex h-full flex-col justify-between gap-6 overflow-hidden p-2'>
			<div className='flex flex-col gap-4 overflow-hidden'>
				<p>{t("radioGroup.label")}</p>

				<RadioGroup
					defaultValue={"newConditions" as AdvancedFiltersTab}
					value={selectedTab}
					onValueChange={onTabChange}>
					<RadioGroup.Item value={"newConditions" as AdvancedFiltersTab}>
						{t("radioGroup.tabs.advancedFilter")}
					</RadioGroup.Item>
					<RadioGroup.Item value={"segmentSelection" as AdvancedFiltersTab}>
						{t("radioGroup.tabs.segments")}
					</RadioGroup.Item>
				</RadioGroup>

				<Suspense fallback={<Skeleton className='h-full rounded-lg' />}>
					{selectedTab == "newConditions" ? <NewConditionsTab /> : <SegmentSelectionTab />}
				</Suspense>
			</div>

			<Footer className='flex-col'>
				{selectedTab === "newConditions" && <CreateSegmentPopover disabled={!areContextConditionsValid} />}

				<div className='flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4'>
					<Button type='reset' variant='outline' onClick={onClose}>
						{t("actions.cancel")}
					</Button>
					<Button
						type='button'
						disabled={
							(!areContextConditionsEmpty && !areContextConditionsValid) ||
							segmentSelectionTabView === "editSegmentConditions"
						}
						onClick={onFormSubmit}>
						{t("actions.applyFilter")}
					</Button>
				</div>
			</Footer>
		</form>
	)
}

export default AdvancedFiltersDialogContent
