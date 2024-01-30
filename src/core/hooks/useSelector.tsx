//#region Import
import { useSelector as useReduxSelector, type TypedUseSelectorHook } from "react-redux"

import type { RootState } from "@/core/lib/redux-toolkit/root-reducer"
//#endregion

const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export default useSelector
