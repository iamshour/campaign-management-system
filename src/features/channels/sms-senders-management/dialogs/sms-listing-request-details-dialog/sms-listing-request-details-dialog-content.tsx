//#region Import
import baseQueryConfigs from "@/core/lib/redux-toolkit/config"
import { Skeleton } from "@/ui"
import SectionHeading from "@/ui/section-heading/section-heading"
import MaterialSymbolsPerson from "~icons/material-symbols/person"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { useGetSmsListingRequestByIdQuery } from "../../api"
// import ReadonlyField from "../../components/readonly-field"
// import { GetSmsSenderRequestDetailsByIdType } from "../../types"
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

const SmsListingRequestDetailsDialogContent = ({ id }: { id: string }) => {
	const { t } = useTranslation("senders-management")

	const { data, isError, isFetching } = useGetSmsListingRequestByIdQuery(id, baseQueryConfigs)

	if (isFetching) return <Skeleton className='h-full' />

	if (!isFetching && !!isError && !data) return <DisplayError />

	// const { listingDetails, ...restData } = data as GetSmsSenderRequestDetailsByIdType
	// console.log(Object.entries(restData))
	// console.log(data)

	return (
		<div className='flex flex-col gap-4 p-2'>
			<div className='rounded-xl bg-[#F7F7F7] p-4 '>
				<SectionHeading icon={MaterialSymbolsPerson} label={t("dialogs.smsListingRequestDetails.senderRequestInfo")} />

				<div className='flex flex-wrap gap-x-6 gap-y-4'>
					{/* {Object.entries(restData)?.map(([value, label]) => <ReadonlyField label={label}>{value}</ReadonlyField>)} */}
				</div>
			</div>
		</div>
	)
}

export default SmsListingRequestDetailsDialogContent
