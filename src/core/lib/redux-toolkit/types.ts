//#region Import
import type { DateRange } from "@package/ui/src/date-range-picker"
import type { TableState } from "@package/ui/src/table/types"
//#endregion

export interface ListDataReturnType<T> {
	list: T[]
	count: number
}

export type CommonListArguments<T> = Omit<TableState<T>, "selection"> & DateRange
