//#region Import
import type { SubscriptionOptions } from "@reduxjs/toolkit/query"
//#endregion

const baseQueryConfigs: SubscriptionOptions = {
	pollingInterval: 300000,
}

export default baseQueryConfigs
