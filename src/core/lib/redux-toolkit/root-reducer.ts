//#region Import
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer, type PersistConfig } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { createBlacklistFilter } from "redux-persist-transform-filter"

import AppReducer, { type AppSliceState } from "@/core/slices/app-slice"
import advancedTableReducer from "@/core/slices/data-grid-slice/data-grid-slice"
import type { DataGridSliceStateType, DataGridKey } from "@/core/slices/data-grid-slice/types"
import authReducer from "@/features/authentication/slice"
import type { AuthSliceState } from "@/features/authentication/types"

import api from "./api"

//#endregion

// const APP_PREFIX = `${import.meta.env.VITE_APP_PREFIX}_`
const APP_PREFIX = "BLUE.AI_CMS"

export type RootState = {
	auth: AuthSliceState
	app: AppSliceState
	dataGrid: DataGridSliceStateType
}

const rootPersistConfig = {
	keyPrefix: APP_PREFIX,
	key: "ROOT",
	version: 1,
	storage,
	whitelist: ["app"] as Partial<keyof RootState>[],
}

const nestedContactsBlacklistedKeys = createBlacklistFilter("contacts", ["selection"])
const nestedGroupsBlacklistedKeys = createBlacklistFilter("groups", ["selection"])
const advancedTablePersistConfig: PersistConfig<any> = {
	keyPrefix: APP_PREFIX,
	key: "ADVANCED_TABLE",
	storage,
	whitelist: ["contacts", "groups"] as Partial<DataGridKey>[],
	transforms: [nestedContactsBlacklistedKeys, nestedGroupsBlacklistedKeys],
}

const reducer = combineReducers({
	auth: authReducer,
	app: AppReducer,
	dataGrid: persistReducer(advancedTablePersistConfig, advancedTableReducer),
	[api.reducerPath]: api.reducer,
})

export default persistReducer(rootPersistConfig, reducer)
