//#region Import
import type { SmsListingType } from "@/features/channels/sms-senders/types"

import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { useGetSmsListingByIdQuery } from "@/features/channels/sms-senders/api"
import { Skeleton } from "@/ui"
import DisplayError from "@/ui/errors/display-error"

//#endregion

interface ViewListingStatusReasonDialogContentProps extends Pick<SmsListingType, "id"> {}

const ViewListingStatusReasonDialogContent = ({ id }: ViewListingStatusReasonDialogContentProps) => {
	const { isError, isInitialLoading, isReady, statusChangeReason } = useGetSmsListingByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.statusChangeReason?.length),
			statusChangeReason: data?.statusChangeReason,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <Skeleton />

	if (isError || !statusChangeReason?.length) return <DisplayError className='h-full w-full' />

	if (isReady) return <p className='p-2'>{statusChangeReason}</p>
}

export default ViewListingStatusReasonDialogContent
