//#region Import
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer, type PersistConfig } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { createBlacklistFilter } from "redux-persist-transform-filter"

import AppReducer, { type AppSliceState } from "@/core/slices/app-slice"
import dataGridReducer from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridSliceStateType, DataGridKey } from "@/core/slices/data-grid-slice/types"
import authReducer from "@/features/authentication/slice"
import type { AuthSliceState } from "@/features/authentication/types"

import api from "./api"
//#endregion

// const APP_PREFIX = `${import.meta.env.VITE_APP_PREFIX}_`
const APP_PREFIX = "BLUE.AI"

export type RootState = {
	auth: AuthSliceState
	app: AppSliceState
	dataGrid: DataGridSliceStateType
}

const rootPersistConfig = {
	keyPrefix: APP_PREFIX,
	key: "_ROOT",
	version: 1,
	storage,
	whitelist: ["app"] as Partial<keyof RootState>[],
}

/**
 * Custom Utility funciton used for `dataGrid` reducer, which whitelists passed keys (persist them),
 * and removes `selection` entry from these keys so that it won't be persited
 * @param gridKeys `dataGrid` keys to have its values stored/persisted
 * @returns persistReducer function
 */
const getDataGridPersistReducer = (gridKeys: DataGridKey[]) => {
	const config: PersistConfig<DataGridSliceStateType> = {
		keyPrefix: APP_PREFIX,
		key: "_DATA_GRID",
		storage,
		whitelist: gridKeys,
		// Progromatically Removing/blacklisting selection from all persisted `dataGrid keys` in `dataGridSlice`
		transforms: gridKeys.map((key) => createBlacklistFilter(key, ["selection"])),
	}

	return persistReducer(config, dataGridReducer)
}

const reducer = combineReducers({
	auth: authReducer,
	app: AppReducer,
	dataGrid: getDataGridPersistReducer(["contacts", "groups", "sms-templates", "sms-prebuilt-templates"]),
	[api.reducerPath]: api.reducer,
})

export default persistReducer(rootPersistConfig, reducer)
