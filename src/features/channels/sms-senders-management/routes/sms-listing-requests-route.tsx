//#region Import
import { SharedListViewProps } from "@/core/types"
import { DataTableSkeleton } from "@/ui"
import { lazy } from "react"

import type { SmsRequestStatus } from "../types"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

// TO BE SELECTED FROM RTK-SLICE
const currentStatus: SmsRequestStatus = "PENDING"

const SmsListingRequestsRoute = () => {
	// Get Fetched list here... (RTK)
	// .. Pass params from rtk-slice
	// .. pass above filter ("COMPLETED" | "PENDING")
	const { count, error, isEmpty, isError, isFetching, isLoading, list } = {
		count: 0,
		error: {},
		isEmpty: true,
		isError: false,
		isFetching: false,
		isLoading: false,
		list: [],
	}

	if (isLoading) return <DataTableSkeleton />

	if (isError) return <DisplayError error={error as any} showReloadButton />

	if (isEmpty) {
		const EmptyComponentToRender = EmptyComponents[currentStatus]

		return <EmptyComponentToRender />
	}

	if (count) {
		const ListComponentToRender = ListComponents[currentStatus]

		return <ListComponentToRender count={count || 0} isFetching={isFetching} list={list || []} />
	}
}

export default SmsListingRequestsRoute

const EmptyComponents: Record<SmsRequestStatus, React.LazyExoticComponent<() => JSX.Element>> = {
	COMPLETED: lazy(() => import("../views/sms-listing-requests-completed-view/sms-listing-requests-completed-empty")),
	PENDING: lazy(() => import("../views/sms-listing-requests-pending-view/sms-listing-requests-pending-empty")),
}

const ListComponents: Record<
	SmsRequestStatus,
	React.LazyExoticComponent<(props: SharedListViewProps<any>) => JSX.Element>
> = {
	COMPLETED: lazy(() => import("../views/sms-listing-requests-completed-view/sms-listing-requests-completed-view")),
	PENDING: lazy(() => import("../views/sms-listing-requests-pending-view/sms-listing-requests-pending-view")),
}
