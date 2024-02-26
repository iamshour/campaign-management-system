//#region Import
import type { DataGridKey, DataGridState } from "@/core/slices/data-grid-slice/types"
import type { AuthSliceState } from "@/features/authentication/types"

import AppReducer, { type AppSliceState } from "@/core/slices/app-slice"
import dataGridReducer from "@/core/slices/data-grid-slice/data-grid-slice"
import authReducer from "@/features/authentication/slice"
import { combineReducers } from "@reduxjs/toolkit"
import { type PersistConfig, persistReducer } from "redux-persist"
import { createBlacklistFilter } from "redux-persist-transform-filter"
import storage from "redux-persist/lib/storage"

import api from "./api"
//#endregion

// const APP_PREFIX = `${import.meta.env.VITE_APP_PREFIX}_`
const APP_PREFIX = "BLUE.AI"

export type RootState = {
	app: AppSliceState
	auth: AuthSliceState
	dataGrid: { [K in DataGridKey]: DataGridState<K> }
}

const rootPersistConfig = {
	key: "_ROOT",
	keyPrefix: APP_PREFIX,
	storage,
	version: 1,
	whitelist: ["app", "auth"] as Partial<keyof RootState>[],
}

/**
 * Custom Utility funciton used for `dataGrid` reducer, which whitelists passed keys (persist them),
 * and removes `selection` entry from these keys so that it won't be persited
 * @param gridKeys `dataGrid` keys to have its values stored/persisted
 * @returns persistReducer function
 */
const getDataGridPersistReducer = (gridKeys: DataGridKey[]) => {
	const config: PersistConfig<RootState["dataGrid"]> = {
		key: "_DATA_GRID",
		keyPrefix: APP_PREFIX,
		storage,
		// Progromatically Removing/blacklisting selection from all persisted `dataGrid keys` in `dataGridSlice`
		transforms: gridKeys.map((key) => createBlacklistFilter(key, ["selection"])),
		whitelist: gridKeys,
	}

	return persistReducer(config, dataGridReducer)
}

const reducer = combineReducers({
	[api.reducerPath]: api.reducer,
	app: AppReducer,
	auth: authReducer,
	dataGrid: getDataGridPersistReducer(["contacts", "groups", "sms-templates", "sms-prebuilt-templates"]),
})

export default persistReducer(rootPersistConfig, reducer)
