//#region Import
import { createContext, useContext } from "react"

import type { BulkFunnelKey } from "./configs"
//#endregion

type BulkRequestsFormContextValue = { funnelKey: BulkFunnelKey }

export const BulkRequestsFormContext = createContext({} as BulkRequestsFormContextValue)

export const useBulkRequestsFormContext = (): BulkRequestsFormContextValue => useContext(BulkRequestsFormContext)
