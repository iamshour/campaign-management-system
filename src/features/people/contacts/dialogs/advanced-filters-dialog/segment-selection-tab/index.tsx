//#region Import
import { type OptionType } from "@package/ui"
import NotFoundError from "@package/ui/src/errors/notfound-error"
import Skeleton from "@package/ui/src/skeleton"
import Spinner from "@package/ui/src/spinner"
import { Suspense, lazy, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSegmentByIdQuery } from "@/features/people/segments/api"
import SelectSegmentsPopover from "@/features/people/segments/components/select-segments-popover"
import type { Segment, SegmentConditionType } from "@/features/people/segments/types"

import { useAdvancedFiltersDialogContext } from "../advanced-filters-dialog-context"
//#endregion

export type SegmentSelectionRenderedView = "viewSegmentConditions" | "editSegmentConditions"

const SegmentSelectionTab = () => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters.segment" })

	const {
		selectedSegmentOption,
		onSegmentSelection,
		setConditions,
		segmentSelectionTabView,
		setSegmentSelectionTabView,
	} = useAdvancedFiltersDialogContext()

	const RenderedView = useMemo(() => views[segmentSelectionTabView], [segmentSelectionTabView])

	const { segment, isError, isFetching, isSuccess } = useGetSegmentByIdQuery(selectedSegmentOption?.value, {
		skip: !selectedSegmentOption?.value,
		selectFromResult: ({ data, ...rest }) => ({
			segment: {
				id: data?.id as string,
				name: data?.name as string,
				description: data?.description,
				conditions: data?.contactSegmentConditionDetailsList?.map((condition) => ({
					rules: condition?.contactSegmentRuleDetailsList?.map((rule) => ({
						id: rule.id,
						attribute: rule?.contactSegmentRuleAttribute,
						condition: rule?.contactSegmentRuleCondition,
						specification: rule?.specification || undefined,
						country: rule?.country || undefined,
						group: rule?.group ? { label: rule?.group?.name, value: rule?.group?.id } : undefined,
						segment: rule?.contactSegment
							? { label: rule?.contactSegment?.name, value: rule?.contactSegment?.id }
							: undefined,
					})),
				})) as SegmentConditionType[],
			},
			...rest,
		}),
		...baseQueryConfigs,
	})

	useEffect(() => {
		if (!isFetching && isSuccess && segment.conditions) {
			setConditions(segment.conditions)
		}
		// eslint-disable-next-line
	}, [isFetching, isSuccess, setConditions])

	return (
		<>
			<p>{t("selectSegment")}</p>

			<SelectSegmentsPopover
				label='Segment *'
				// TODO: Fix parent ComboBox to accept single entries
				// isMulti={false}
				selectedOptions={selectedSegmentOption ? ([selectedSegmentOption] as OptionType[]) : []}
				updateSelectedOptions={(options) => {
					const selection = options?.filter((op) => op?.value !== (selectedSegmentOption as OptionType)?.value)
					return onSegmentSelection(selection[0] as OptionType)
				}}
			/>

			{!!selectedSegmentOption?.value && (
				<div className='relative flex flex-1 flex-col gap-4 overflow-hidden rounded-xl bg-[#F7F7F7] p-4 before:transition-basic'>
					<div className='flex w-full flex-col overflow-y-auto'>
						{isFetching && (
							<div className='h-full w-full flex-center'>
								<Spinner size='lg' />
							</div>
						)}

						{isError && <NotFoundError />}

						{isSuccess && (
							<Suspense fallback={<Skeleton className='h-full w-full' />}>
								<RenderedView setView={setSegmentSelectionTabView} segment={segment} />
							</Suspense>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default SegmentSelectionTab

export type SegmentSelectionRenderedViewProps = {
	setView: React.Dispatch<React.SetStateAction<SegmentSelectionRenderedView>>
	segment: Pick<Segment, "id" | "name" | "description"> & { conditions: SegmentConditionType[] }
}

const views: Record<
	SegmentSelectionRenderedView,
	React.LazyExoticComponent<(props: SegmentSelectionRenderedViewProps) => JSX.Element>
> = {
	editSegmentConditions: lazy(() => import("./edit-segment-conditions")),
	viewSegmentConditions: lazy(() => import("./view-segment-conditions")),
}
