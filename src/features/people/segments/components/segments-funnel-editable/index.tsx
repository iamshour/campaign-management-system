//#region Import
import { twMerge, Button } from "@/ui"
import { createContext, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"

import { emptySegmentCondition } from "@/features/people/segments/constants/preset-segments"
import type { SegmentConditionType } from "@/features/people/segments/types"

import SegmentCondition from "./segment-condition"
//#endregion

interface SegmentsContextValue {
	/**
	 * List of segment conditions
	 */
	conditions: SegmentConditionType[]

	/**
	 * Function to update the list of conditions
	 */
	setConditions: React.Dispatch<React.SetStateAction<SegmentConditionType[]>>

	/**
	 * Total Length of conditions added
	 */
	conditionsLength: number
}

const SegmentsContextProvider = createContext<SegmentsContextValue>({} as SegmentsContextValue)
// eslint-disable-next-line
export const useSegmentsFunnelContext = (): SegmentsContextValue => useContext(SegmentsContextProvider)

interface SegmentsFunnelEditableProps extends Omit<SegmentsContextValue, "conditionsLength"> {
	disabled?: boolean
}

const SegmentsFunnelEditable = ({
	conditions = [emptySegmentCondition],
	setConditions,
	disabled,
}: SegmentsFunnelEditableProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "views.editableSegmentView.items.conditions" })

	const addCondition = () => setConditions((prev) => [...prev, emptySegmentCondition])

	const conditionsLength = useMemo(() => conditions?.length || 0, [conditions])

	return (
		<SegmentsContextProvider.Provider value={{ conditions, setConditions, conditionsLength }}>
			<div
				className={twMerge(
					"flex h-full w-full flex-col gap-4 p-2 pt-8",
					disabled && "[&_*]:!pointer-events-none [&_*]:!opacity-90"
				)}>
				{conditions?.map(({ rules }, conditionIdx) => (
					<SegmentCondition key={conditionIdx} rules={rules} conditionIdx={conditionIdx} />
				))}

				<Button
					type='button'
					className='mt-2 w-max shrink-0 bg-primary-600'
					size='sm'
					onClick={addCondition}
					// Max number of allowed conditions === 10
					disabled={conditionsLength >= 10}>
					{t("actions.orOperator")}
				</Button>
			</div>
		</SegmentsContextProvider.Provider>
	)
}

export default SegmentsFunnelEditable
