//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourceListingByIdQuery } from "@/features/channels/common/api"
import { Skeleton } from "@/ui"
import { lazy } from "react"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

export interface ViewListingStatusReasonDialogContentProps extends Pick<ChannelSourceListing, "id"> {}

const ViewListingStatusReasonDialogContent = ({ id }: ViewListingStatusReasonDialogContentProps) => {
	const { isError, isInitialLoading, isReady, statusReason } = useGetChannelSourceListingByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.channelSourceListingStatusReason?.length),
			statusReason: data?.channelSourceListingStatusReason,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <Skeleton className='h-[119px]' />

	if (isError || !statusReason?.length) return <DisplayError className='h-full w-full' />

	if (isReady) return <p className='p-2'>{statusReason}</p>
}

export default ViewListingStatusReasonDialogContent
