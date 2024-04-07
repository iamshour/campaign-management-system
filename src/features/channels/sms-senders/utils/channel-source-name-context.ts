//#region Import
import { ChannelSource } from "@/features/channels/common/types/data.types"
import { createContext, useContext } from "react"
//#endregion

type ChannelSourceNameContextValue = Pick<ChannelSource, "channelSourceName">

export const ChannelSourceNameContext = createContext({} as ChannelSourceNameContextValue)

export const useChannelSourceNameContext = (): ChannelSourceNameContextValue => useContext(ChannelSourceNameContext)
