import { createContext, useContext } from "react"

import type { RowData } from "./data-table/types"
import type { DataViewKey, DataViewProps } from "./types"

type DataViewContextValue<TData extends RowData, K extends DataViewKey = DataViewKey> = Omit<
	DataViewProps<TData, K>,
	"children" | "className"
> & {
	selectionPerPage: number
}

const DataViewContext = createContext({} as DataViewContextValue<any, any>)

export default DataViewContext

// eslint-disable-next-line
export const useDataViewContext = <TData extends RowData, K extends DataViewKey = DataViewKey>(): DataViewContextValue<TData, K> =>
	useContext(DataViewContext as React.Context<DataViewContextValue<TData, K>>)
