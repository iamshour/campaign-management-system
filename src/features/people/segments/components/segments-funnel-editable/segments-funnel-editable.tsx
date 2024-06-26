//#region Import
import type { SegmentConditionType } from "@/features/people/segments/types"

import { emptySegmentCondition } from "@/features/people/segments/constants/preset-segments"
import { Button } from "@/ui"
import { createContext, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

import SegmentCondition from "./segment-condition"
//#endregion

interface SegmentsContextValue {
	/**
	 * List of segment conditions
	 */
	conditions: SegmentConditionType[]

	/**
	 * Total Length of conditions added
	 */
	conditionsLength: number

	/**
	 * Function to update the list of conditions
	 */
	setConditions: React.Dispatch<React.SetStateAction<SegmentConditionType[]>>
}

const SegmentsContextProvider = createContext<SegmentsContextValue>({} as SegmentsContextValue)
// eslint-disable-next-line
export const useSegmentsFunnelContext = (): SegmentsContextValue => useContext(SegmentsContextProvider)

interface SegmentsFunnelEditableProps extends Omit<SegmentsContextValue, "conditionsLength"> {
	disabled?: boolean
}

const SegmentsFunnelEditable = ({
	conditions = [emptySegmentCondition],
	disabled,
	setConditions,
}: SegmentsFunnelEditableProps) => {
	const { t } = useTranslation("segments", { keyPrefix: "views.editableSegmentView.items.conditions" })

	const addCondition = () => setConditions((prev) => [...prev, emptySegmentCondition])

	const conditionsLength = useMemo(() => conditions?.length || 0, [conditions])

	return (
		<SegmentsContextProvider.Provider value={{ conditions, conditionsLength, setConditions }}>
			<div
				className={twMerge(
					"flex h-full w-full flex-col gap-4 p-2 pt-8",
					disabled && "[&_*]:!pointer-events-none [&_*]:!opacity-90"
				)}>
				{conditions?.map(({ rules }, conditionIdx) => (
					<SegmentCondition conditionIdx={conditionIdx} key={conditionIdx} rules={rules} />
				))}

				<Button
					className='mt-2 w-max shrink-0 bg-primary-600'
					// Max number of allowed conditions === 10
					disabled={conditionsLength >= 10}
					onClick={addCondition}
					size='sm'
					type='button'>
					{t("actions.orOperator")}
				</Button>
			</div>
		</SegmentsContextProvider.Provider>
	)
}

export default SegmentsFunnelEditable
