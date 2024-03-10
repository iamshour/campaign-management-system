//#region Import
import type { AddBulkSmsListingsBody } from "@/features/channels/sms-senders-management/types"

import getCountryName from "@/core/utils/get-country-name"
import { Button, CompactTable, ReadonlyInput, SectionHeading } from "@/ui"
import JamTriangleDangerF from "~icons/jam/triangle-danger-f"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
//#endregion

export type SmsListingRequestCreationPreviewData = Omit<AddBulkSmsListingsBody, "channelSourceRequestRouteList"> & {
	channelSourceRequestRouteList: (AddBulkSmsListingsBody["channelSourceRequestRouteList"][number] & {
		errorKey: string
	})[]
}

export interface SmsListingRequestCreationPreviewProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	data: SmsListingRequestCreationPreviewData

	errorsIdx: number[]
}

const SmsListingRequestCreationPreview = ({
	closeDialog,
	data,
	errorsIdx = [],
}: SmsListingRequestCreationPreviewProps) => {
	const { t } = useTranslation("senders-management", {
		keyPrefix: "components.smsListingRequestCreationPreview",
	})

	const onRowClick = (formKeyId: string) => {
		return () => {
			closeDialog()

			const element = document.getElementById(formKeyId)

			element?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
		}
	}

	return (
		<div className='flex h-full flex-col gap-8 p-2'>
			<p>{t("message")}</p>

			<div className='relative flex flex-1 flex-col rounded-xl bg-[#F7F7F7] p-6'>
				<Button className='absolute right-4 top-4' onClick={closeDialog} type='button' variant='link'>
					{t("editDetails")}
				</Button>
				<SectionHeading icon={MdiInformationVariantCircle} label='Sender ID Basic Info' />

				<div className='mb-5 flex w-full flex-row flex-wrap gap-x-6 gap-y-3'>
					<ReadonlyInput
						className='w-[340px] rounded-lg bg-white ring-0'
						label={t("basicInfo.company")}
						size='lg'
						value={data.companyId}
					/>
					{data.userId && (
						<ReadonlyInput
							className='w-[340px] rounded-lg bg-white ring-0'
							label={t("basicInfo.email")}
							size='lg'
							value={data.userId}
						/>
					)}
					<ReadonlyInput
						className='w-[340px] rounded-lg bg-white ring-0'
						label={t("basicInfo.sender")}
						size='lg'
						value={data.channelSource}
					/>
				</div>
				{!!data?.channelSourceRequestRouteList?.length && (
					<div className='flex-1 overflow-hidden rounded-xl bg-white py-2'>
						<CompactTable className='h-max rounded-none'>
							<CompactTable.Header>
								<CompactTable.Row className='hover:bg-white'>
									<CompactTable.Head className='px-3 pl-11 font-bold uppercase text-black even:bg-gray-50/75'>
										{t("requestsTable.type")}
									</CompactTable.Head>
									<CompactTable.Head className='px-3 font-bold uppercase text-black even:bg-gray-50/75'>
										{t("requestsTable.country")}
									</CompactTable.Head>
									<CompactTable.Head className='px-3 font-bold uppercase text-black last:pr-11 even:bg-gray-50/75'>
										{t("requestsTable.content")}
									</CompactTable.Head>
									{data.channelSourceRequestRouteList[0]?.channelSourceListingStatus && (
										<CompactTable.Head className='px-3 font-bold uppercase text-black last:pr-11 even:bg-gray-50/75'>
											{t("requestsTable.status")}
										</CompactTable.Head>
									)}
								</CompactTable.Row>
							</CompactTable.Header>
							<CompactTable.Body>
								{data.channelSourceRequestRouteList.map((listing, listingIdx) => (
									<CompactTable.Row
										className={twMerge(
											"hover:bg-[#2DAEF533]",
											errorsIdx?.includes(listingIdx) && "cursor-pointer bg-[#FCD7DD] "
										)}
										key={listingIdx}
										onClick={errorsIdx?.includes(listingIdx) ? onRowClick(listing.errorKey) : undefined}>
										<CompactTable.Cell
											className='flex max-w-[200px] flex-row px-2.5 py-2 pl-11 text-xs'
											key={`${listingIdx}_type`}>
											{errorsIdx?.includes(listingIdx) && (
												<JamTriangleDangerF className='-ml-6 mr-2 h-4 w-4 text-[#EB2344]' />
											)}
											{listing.templateType}
										</CompactTable.Cell>
										<CompactTable.Cell className='max-w-[200px] px-2.5 py-2 text-xs' key={`${listingIdx}_country`}>
											{getCountryName(listing.country)}
										</CompactTable.Cell>
										<CompactTable.Cell
											className='max-w-[200px] truncate px-2.5 py-2 text-xs last:pr-11'
											key={`${listingIdx}_content`}
											title={listing.sample}>
											{listing.sample}
										</CompactTable.Cell>
										{listing.channelSourceListingStatus && (
											<CompactTable.Cell
												className='max-w-[200px] px-2.5 py-2 text-xs last:pr-11'
												key={`${listingIdx}_status`}>
												{listing.channelSourceListingStatus}
											</CompactTable.Cell>
										)}
									</CompactTable.Row>
								))}
							</CompactTable.Body>
						</CompactTable>
					</div>
				)}
			</div>
		</div>
	)
}

export default SmsListingRequestCreationPreview
