//#region Import
import type { Segment, SegmentConditionType } from "@/features/people/segments/types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSegmentByIdQuery } from "@/features/people/segments/api"
import SelectSegmentsPopover from "@/features/people/segments/components/select-segments-popover/select-segments-popover"
import { Skeleton, Spinner } from "@/ui"
import { lazy, Suspense, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { useAdvancedFiltersDialogContext } from "../advanced-filters-dialog-context"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

export type SegmentSelectionRenderedView = "editSegmentConditions" | "viewSegmentConditions"

const SegmentSelectionTab = () => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters.segment" })

	const {
		onSegmentSelection,
		segmentSelectionTabView,
		selectedSegmentOption,
		setConditions,
		setSegmentSelectionTabView,
	} = useAdvancedFiltersDialogContext()

	const { isError, isFetching, isSuccess, segment } = useGetSegmentByIdQuery(selectedSegmentOption?.value, {
		selectFromResult: ({ data, ...rest }) => ({
			segment: {
				conditions: data?.contactSegmentConditionDetailsList?.map((condition) => ({
					rules: condition?.contactSegmentRuleDetailsList?.map((rule) => ({
						attribute: rule?.contactSegmentRuleAttribute,
						condition: rule?.contactSegmentRuleCondition,
						country: rule?.country || undefined,
						group: rule?.group ? { label: rule?.group?.name, value: rule?.group?.id } : undefined,
						id: rule.id,
						segment: rule?.contactSegment
							? { label: rule?.contactSegment?.name, value: rule?.contactSegment?.id }
							: undefined,
						specification: rule?.specification || undefined,
					})),
				})) as SegmentConditionType[],
				description: data?.description,
				id: data?.id as string,
				name: data?.name as string,
			},
			...rest,
		}),
		skip: !selectedSegmentOption?.value,
		...baseQueryConfigs,
	})

	useEffect(() => {
		if (!isFetching && isSuccess && segment.conditions) {
			setConditions(segment.conditions)
		}
		// eslint-disable-next-line
	}, [isFetching, isSuccess, setConditions])

	const RenderedView = useMemo(() => views[segmentSelectionTabView], [segmentSelectionTabView])

	return (
		<>
			<p>{t("selectSegment")}</p>

			<SelectSegmentsPopover label='Segment *' selection={selectedSegmentOption} updateSelection={onSegmentSelection} />

			{!!selectedSegmentOption?.value && (
				<div className='relative flex flex-1 flex-col gap-4 overflow-hidden rounded-xl bg-[#F7F7F7] p-4'>
					<div className='flex w-full flex-col overflow-y-auto'>
						<Suspense fallback={<Skeleton className='h-full w-full' />}>
							{isFetching && (
								<div className='h-full w-full flex-center'>
									<Spinner size='lg' />
								</div>
							)}

							{isError && <DisplayError />}

							{isSuccess && <RenderedView segment={segment} setView={setSegmentSelectionTabView} />}
						</Suspense>
					</div>
				</div>
			)}
		</>
	)
}

export default SegmentSelectionTab

export type SegmentSelectionRenderedViewProps = {
	segment: Pick<Segment, "description" | "id" | "name"> & { conditions: SegmentConditionType[] }
	setView: React.Dispatch<React.SetStateAction<SegmentSelectionRenderedView>>
}

const views: Record<
	SegmentSelectionRenderedView,
	React.LazyExoticComponent<(props: SegmentSelectionRenderedViewProps) => JSX.Element>
> = {
	editSegmentConditions: lazy(() => import("./edit-segment-conditions")),
	viewSegmentConditions: lazy(() => import("./view-segment-conditions")),
}
