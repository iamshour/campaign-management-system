import { SubscriptionOptions } from "@reduxjs/toolkit/query"

const baseQueryConfigs: SubscriptionOptions = {
	pollingInterval: 300000,
}

export default baseQueryConfigs
