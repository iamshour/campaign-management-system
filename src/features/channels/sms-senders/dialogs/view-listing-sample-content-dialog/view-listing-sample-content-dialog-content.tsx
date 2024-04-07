//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetChannelSourceListingByIdQuery } from "@/features/channels/common/api"
import { Skeleton } from "@/ui"
import { lazy } from "react"

const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

export interface ViewListingSampleContentDialogContentProps extends Pick<ChannelSourceListing, "id"> {}

const ViewListingSampleContentDialogContent = ({ id }: ViewListingSampleContentDialogContentProps) => {
	const { isError, isInitialLoading, isReady, sampleContent } = useGetChannelSourceListingByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.sample?.length),
			sampleContent: data?.sample,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <Skeleton className='h-[119px]' />

	if (isError || !sampleContent?.length) return <DisplayError className='h-full w-full' />

	if (isReady) return <p className='p-2'>{sampleContent}</p>
}

export default ViewListingSampleContentDialogContent
