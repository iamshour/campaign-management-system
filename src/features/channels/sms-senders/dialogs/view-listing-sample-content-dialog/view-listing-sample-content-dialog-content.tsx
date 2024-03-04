//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { Skeleton } from "@/ui"
import DisplayError from "@/ui/errors/display-error"

import { useGetSmsListingByIdQuery } from "../../api"

//#endregion

interface ViewListingSampleContentDialogContentProps {
	/**
	 * Id of the listing
	 */
	id: string
}

const ViewListingSampleContentDialogContent = ({ id }: ViewListingSampleContentDialogContentProps) => {
	const { isError, isInitialLoading, isReady, sampleContent } = useGetSmsListingByIdQuery(id, {
		selectFromResult: ({ data, isLoading, ...rest }) => ({
			isInitialLoading: data === undefined && isLoading,
			isReady: !isLoading && Boolean(data?.sampleContent?.length),
			sampleContent: data?.sampleContent,
			...rest,
		}),
		skip: !id,
		...baseQueryConfigs,
	})

	if (isInitialLoading) return <Skeleton />

	if (isError || !sampleContent?.length) return <DisplayError className='h-full w-full' />

	if (isReady) return <p className='p-2'>{sampleContent}</p>
}

export default ViewListingSampleContentDialogContent
