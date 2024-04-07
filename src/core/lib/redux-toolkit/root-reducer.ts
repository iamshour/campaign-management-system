//#region Import
import type { DataViewKey, DataViewState } from "@/core/components/data-view/types"
import type { AuthSliceState } from "@/features/authentication/types"

import dataViewReducer from "@/core/components/data-view/data-view-slice"
import AppReducer, { type AppSliceState } from "@/core/slices/app-slice"
import authReducer from "@/features/authentication/slice"
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import { createBlacklistFilter } from "redux-persist-transform-filter"
import storage from "redux-persist/lib/storage"

import api from "./api"
//#endregion

// const APP_PREFIX = `${import.meta.env.VITE_APP_PREFIX}_`
const APP_PREFIX = "BLUE.AI"

export type RootState = {
	app: AppSliceState
	auth: AuthSliceState
	dataView: { [K in DataViewKey]: DataViewState<K> }
}

const rootPersistConfig = {
	key: "_ROOT",
	keyPrefix: APP_PREFIX,
	storage,
	version: 1,
	whitelist: ["app", "auth"] as Partial<keyof RootState>[],
}

/**
 * Custom Utility funciton used for `dataView` reducer, which whitelists passed keys (persist them),
 * and removes `selection` entry from these keys so that it won't be persited
 * @param keys `dataView` keys to have its values stored/persisted
 * @returns persistReducer function
 */
const getDataViewPersistReducer = (keys: DataViewKey[]) => {
	const config = {
		key: "_DATA_VIEW",
		keyPrefix: APP_PREFIX,
		storage,
		// Progromatically Removing/blacklisting selection from all persisted `dataView keys` in `dataViewSlice`
		transforms: keys.map((key) => createBlacklistFilter(key, ["selection"])),
		whitelist: keys,
	}

	return persistReducer(config, dataViewReducer)
}

const reducer = combineReducers({
	[api.reducerPath]: api.reducer,
	app: AppReducer,
	auth: authReducer,
	dataView: getDataViewPersistReducer(["contacts", "groups", "sms-templates", "sms-prebuilt-templates"]),
})

export default persistReducer(rootPersistConfig, reducer)
