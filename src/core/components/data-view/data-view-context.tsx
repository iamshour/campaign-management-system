import { createContext, useContext } from "react"

import type { RowData } from "./data-table/types"
import type { DataViewProps } from "./types"

type DataViewContextValue<TData extends RowData> = Omit<DataViewProps<TData>, "children" | "className"> & {
	selectionPerPage: number
}

const DataViewContext = createContext({} as DataViewContextValue<any>)

export default DataViewContext

// eslint-disable-next-line
export const useDataViewContext = <TData extends RowData>(): DataViewContextValue<TData> =>
	useContext(DataViewContext as React.Context<DataViewContextValue<TData>>)
