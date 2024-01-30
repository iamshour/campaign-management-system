//#region Import
import { configureStore, type Store } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"

import api from "./api"
import errorMiddleware from "./errorMiddleware"
import reducer from "./root-reducer"
//#endregion

const store: Store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(api.middleware, errorMiddleware),
	// only uses devTools in development mode
	devTools: import.meta.env.NODE_ENV !== "production",
})
const persistor = persistStore(store)

export default { store, persistor }

export type AppDispatch = typeof store.dispatch
