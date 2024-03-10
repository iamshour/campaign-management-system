//#region Import
import type { ChannelSourceListing } from "@/features/channels/common/types/data.types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsListingByIdQuery } from "@/features/channels/common/api"
import { Skeleton } from "@/ui"
import DisplayError from "@/ui/errors/display-error"
//#endregion

interface ViewListingStatusReasonDialogContentProps extends Pick<ChannelSourceListing, "id"> {}

const ViewListingStatusReasonDialogContent = ({ id }: ViewListingStatusReasonDialogContentProps) => {
	const { isError, isInitialLoading, isReady, statusReason } = useGetSmsListingByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.statusReason?.length),
			statusReason: data?.statusReason,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <Skeleton />

	if (isError || !statusReason?.length) return <DisplayError className='h-full w-full' />

	if (isReady) return <p className='p-2'>{statusReason}</p>
}

export default ViewListingStatusReasonDialogContent
