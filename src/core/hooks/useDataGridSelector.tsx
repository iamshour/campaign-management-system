//#region Import
import { createSelector } from "@reduxjs/toolkit"

import type { RootState } from "../lib/redux-toolkit/root-reducer"
import type { DataGridKey, DataGridState } from "../slices/data-grid-slice/types"

import useSelector from "./useSelector"
//#endregion

const useDataGridSelector = <K extends DataGridKey, T extends keyof DataGridState<K>>(
	dataGridKey: K,
	stateKey: T
): DataGridState<K>[T] => {
	const getState = createSelector(
		(state: RootState) => state.dataGrid[dataGridKey],
		(state) => state[stateKey]
	)

	const state = useSelector(getState)

	return state
}

export default useDataGridSelector
