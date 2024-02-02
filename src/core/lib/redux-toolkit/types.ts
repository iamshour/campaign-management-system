//#region Import
import type { DateRange, TableState } from "@/ui"
//#endregion

export interface ListDataReturnType<T> {
	list: T[]
	count: number
}

export type CommonListArguments<T> = Omit<TableState<T>, "selection"> & DateRange
