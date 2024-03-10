//#region Import
import type { TemplateType } from "@/features/templates/common/types"
import type { Country } from "react-phone-number-input"

import type { ChannelSourceListingStatus, ChannelSourceRequestStatus, ChannelType } from "../common/types/data.types"
//#endregion

/* ******* */
/* ******* */
/* SENDERS */
/* ******* */
/* ******* */

/**
 * Type options for the SMS Channel Sources dataView key
 */
export type SmsChannelSourceDataViewKey = "international-sms-channel-sources" | "local-sms-channel-sources"

/**
 * Shape of fetched SMS Sender
 */
export type SmsSenderType = {
	createdAt: string
	id: string
	name: string
	types: TemplateType[]
}

/* ******** */
/* ******** */
/* REQUESTS */
/* ******** */
/* ******** */

/**
 * Shape of fetched SMS Sender Request
 */
export type SmsRequestType = {
	country: Country
	createdAt: string
	id: string
	note?: string
	requestStatus: ChannelSourceRequestStatus
	sampleContent: string
	sender: string
	status: ChannelSourceListingStatus
	statusChangeDate: string
	statusChangeReason: string
	type: TemplateType
}

/**
 * Body Arguments passed to the `addSmsRequest` mutation, used to send a new listing request
 */
export type AddSmsRequestBody = {
	channelSource: string
	channelSourceRequestRoute: {
		country: Country
		sample: string
		templateType: TemplateType
	}
	channelType: ChannelType
	companyId: string
	note?: string
}
