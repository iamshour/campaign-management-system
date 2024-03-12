//#region Import
// import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
// import { FullViewSkeleton, NoResultsFound } from "@/ui"
// import DisplayError from "@/ui/errors/display-error"
// import { useParams } from "react-router-dom"

// import { useGetChannelSourceByIdQuery } from "../api"
import ChannelSourceView from "../views/channel-source-view/channel-source-view"
//#endregion

const ChannelSourceRoute = () => {
	// const { channelSourceId } = useParams()

	// const { channelSourceName, isError, isInitialLoading, isReady, templateTypes } = useGetChannelSourceByIdQuery(
	// 	channelSourceId!,
	// 	{
	// 		selectFromResult: ({ data, isLoading, ...rest }) => ({
	// 			channelSourceName: data?.channelSourceName,
	// 			isInitialLoading: data === undefined && isLoading,
	// 			isReady: !isLoading && Boolean(data?.templateTypes),
	// 			templateTypes: data?.templateTypes,
	// 			...rest,
	// 		}),
	// 		skip: !channelSourceId,
	// 		...baseQueryConfigs,
	// 	}
	// )

	// if (isInitialLoading) return <FullViewSkeleton />

	// if (isError || !types) return <DisplayError className='h-full w-full' />

	// if (!types?.length || !name?.length) return <NoResultsFound />

	// if (isReady) return <ChannelSourceView channelSourceName={name} templateTypes={types} />

	// TODO: get name and types from backend
	return <ChannelSourceView channelSourceName={"test name"} templateTypes={["OTP", "PROMOTIONAL", "TRANSACTIONAL"]} />
}

export default ChannelSourceRoute
