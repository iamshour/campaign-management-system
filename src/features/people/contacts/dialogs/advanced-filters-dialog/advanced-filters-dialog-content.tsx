//#region Import
import type { ContactTableAdvancedFiltersType } from "@/features/people/contacts/types"

import useDispatch from "@/core/hooks/useDispatch"
import { updateFilters } from "@/core/slices/data-grid-slice/data-grid-slice"
import CreateSegmentPopover from "@/features/people/segments/components/create-segment-popover/create-segment-popover"
import { areConditionsValid } from "@/features/people/segments/utils"
import { Button, Footer, RadioGroup, Skeleton } from "@/ui"
import { lazy, Suspense, useMemo } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import type { AdvancedFiltersTab } from "./types"

import { useAdvancedFiltersDialogContext } from "./advanced-filters-dialog-context"

const NewConditionsTab = lazy(() => import("./new-conditions-tab"))

const SegmentSelectionTab = lazy(() => import("./segment-selection-tab/segment-selection-tab"))
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
		areContextConditionsEmpty,
		conditions,
		onTabChange,
		segmentSelectionTabView,
		selectedSegmentOption,
		selectedTab,
	} = useAdvancedFiltersDialogContext()

	const areContextConditionsValid = useMemo(() => areConditionsValid(conditions), [conditions])

	const handleUpdateFilters = (advancedFilters: ContactTableAdvancedFiltersType["advancedFilters"]) =>
		dispatch(updateFilters({ contacts: { advancedFilters } }))

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// TODO: CHECK IF WORKING!!
		if (areContextConditionsEmpty) handleUpdateFilters(undefined)

		if (areContextConditionsValid)
			handleUpdateFilters({ conditions, segment: selectedTab === "newConditions" ? undefined : selectedSegmentOption })

		onClose()
		toast.success(t("appliedSuccessMessage"))
	}

	return (
		<form className='flex h-full flex-col justify-between gap-6 overflow-hidden p-2' onSubmit={onSubmit}>
			<div className='flex flex-col gap-4 overflow-hidden'>
				<p>{t("radioGroup.label")}</p>

				<RadioGroup
					defaultValue={"newConditions" as AdvancedFiltersTab}
					onValueChange={onTabChange}
					value={selectedTab}>
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
					<Button onClick={onClose} type='reset' variant='outline'>
						{t("actions.cancel")}
					</Button>
					<Button
						disabled={
							segmentSelectionTabView === "editSegmentConditions" ||
							(!areContextConditionsEmpty && !areContextConditionsValid)
						}
						type='submit'>
						{t("actions.applyFilter")}
					</Button>
				</div>
			</Footer>
		</form>
	)
}

export default AdvancedFiltersDialogContent
