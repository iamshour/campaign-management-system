//#region Import
import type { ColumnType } from "@/core/components/data-view/data-table/types"

import getCountryName from "@/core/utils/get-country-name"
import { Button } from "@/ui"
import MaterialSymbolsSyncRounded from "~icons/material-symbols/sync-rounded"

import type { SmsOptedOutSenderType } from "../types"

import OptInSmsSenderDialog from "../dialogs/opt-in-sms-sender-dialog/opt-in-sms-sender-dialog"
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
		cell: (_, { id }) => (
			<OptInSmsSenderDialog id={id} showTooltip>
				<Button className='h-max w-max p-1.5 text-lg text-[#939393]' variant='ghost'>
					<MaterialSymbolsSyncRounded />
				</Button>
			</OptInSmsSenderDialog>
		),
		preventCellClick: true,
	},
]

export default smsOptedOutSendersTableColumns
