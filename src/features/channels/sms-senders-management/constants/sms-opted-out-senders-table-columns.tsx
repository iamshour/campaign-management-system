//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"

import type { SmsOptedOutSenderType } from "../types"

import SmsOptInSenderDialog from "../dialogs/sms-opt-in-sender-dialog/sms-opt-in-sender-dialog"
import smsOptedOutFieldsLocaleMap from "./sms-opted-out-fields-locale-map"
//#endregion

const smsOptedOutSendersTableColumns: ColumnType<SmsOptedOutSenderType>[] = [
	{
		accessorKey: "selection",
		rowIdSelector: "id",
	},
	{
		accessorKey: "phoneNumber",
		header: smsOptedOutFieldsLocaleMap.phoneNumber,
	},
	{
		accessorKey: "country",
		cell: (country) => getCountryName(country),
		header: smsOptedOutFieldsLocaleMap.country,
	},
	{
		accessorKey: "actions",
		cell: (_, { id }) => <SmsOptInSenderDialog id={id} />,
		preventCellClick: true,
	},
]

export default smsOptedOutSendersTableColumns
