//#region Import
import type { AddBulkChannelSourceRequestsBody } from "@/features/channels/sms-senders-management/types/api.types"

import useGetChannelType from "@/core/hooks/useGetChannelType"
import getCountryName from "@/core/utils/get-country-name"
import { Button, CompactTable, Footer, ReadonlyInput, SectionHeading, Tooltip } from "@/ui"
import JamTriangleDangerF from "~icons/jam/triangle-danger-f"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import type { BulkPreviewData, ListingError } from "../../components/bulk-requests-form/types"

import { useBulkRequestsFormContext } from "../../components/bulk-requests-form/bulk-requests-form-context"
import getBulkCreationErrorsList from "../../utils/get-bulk-creation-errors-list"
//#endregion

export interface BulkRequestsCreationConfirmDialogContentProps {
	/**
	 * Callback function used to close the dialog
	 */
	closeDialog: () => void

	data: BulkPreviewData

	/**
	 * Callback function used to Submit Data to the server
	 */
	onSubmit: <T extends AddBulkChannelSourceRequestsBody>(data: T) => Promise<T>
}

const BulkRequestsCreationConfirmDialogContent = ({
	closeDialog,
	data,
	onSubmit,
}: BulkRequestsCreationConfirmDialogContentProps) => {
	const { funnelKey } = useBulkRequestsFormContext()

	const navigate = useNavigate()

	const { state } = useLocation()

	const { t } = useTranslation("senders-management", { keyPrefix: `dialogs.bulkRequestsCreationConfirm.${funnelKey}` })

	const { setError } = useFormContext()

	const { channelType } = useGetChannelType()

	const [errors, setErrors] = useState<ListingError[]>([])

	const onDialogSubmit = () => {
		if (!data || !channelType) return

		const body: AddBulkChannelSourceRequestsBody = {
			channelSource: data?.channelSource || undefined,
			channelSourceRequestRouteList: data.channelSourceRequestRouteList.map((r) => ({ ...r, errorKey: undefined })),
			channelType,
			companyId: data?.company?.value,
			userId: data.email?.value || undefined,
		}

		onSubmit(body)
			.then(() => {
				closeDialog()
				navigate(state?.from || -1)
			})
			.catch((error: any) => {
				if (error?.data?.statusCode === 4011303 && error?.data?.data !== undefined) {
					const errors = getBulkCreationErrorsList({ data, errorsData: error?.data?.data, setError })

					setErrors(errors)
				}
			})
	}

	const onRowClick = (formKeyId: string) => {
		return () => {
			closeDialog()

			const element = document.getElementById(formKeyId)

			element?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
		}
	}

	return (
		<div className='flex h-full flex-col gap-8 overflow-hidden p-2'>
			<p>{t("message")}</p>

			<div className='relative flex flex-1 flex-col space-y-4 overflow-hidden rounded-xl bg-[#F7F7F7] p-6'>
				<header className='flex w-full items-start justify-between'>
					<SectionHeading icon={MdiInformationVariantCircle} label='Sender ID Basic Info' />

					<Button onClick={closeDialog} type='button' variant='link'>
						{t("editDetails")}
					</Button>
				</header>

				<div className='flex w-full flex-row flex-wrap gap-x-6 gap-y-3'>
					<ReadonlyInput
						className='w-[340px] rounded-lg bg-white ring-0'
						label={t("basicInfo.company")}
						size='lg'
						value={data.company?.label}
					/>
					{!!data.email?.label && (
						<ReadonlyInput
							className='w-[340px] rounded-lg bg-white ring-0'
							label={t("basicInfo.email")}
							size='lg'
							value={data.email?.label}
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
						<CompactTable className='h-max max-h-full rounded-none'>
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
								{data.channelSourceRequestRouteList.map((listing, listingIdx) => {
									const rowHasError = !!errors?.length && errors?.some((error) => error.errorIdx === listingIdx)

									return (
										<CompactTable.Row
											className={twMerge(
												"hover:bg-[#2DAEF533]",
												rowHasError && "cursor-pointer bg-[#FCD7DD] hover:bg-[#f7c8cf]"
											)}
											key={listingIdx}
											onClick={rowHasError ? onRowClick(listing.errorKey) : undefined}>
											<CompactTable.Cell
												className='flex max-w-[200px] flex-row px-2.5 py-2 pl-11 text-xs'
												key={`${listingIdx}_type`}>
												{rowHasError && (
													<Tooltip
														content={errors?.find((err) => err.errorIdx === listingIdx)?.errorMessage || ""}
														sideOffset={6}>
														<span>
															<JamTriangleDangerF className='-ml-6 mr-2 h-4 w-4 text-[#EB2344]' />
														</span>
													</Tooltip>
												)}
												{listing.templateType}
											</CompactTable.Cell>
											<CompactTable.Cell className='max-w-[200px] px-2.5 py-2 text-xs'>
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
									)
								})}
							</CompactTable.Body>
						</CompactTable>
					</div>
				)}
			</div>

			<Footer>
				<Button className='px-10' onClick={closeDialog} variant='outline'>
					{t("cancel")}
				</Button>
				<Button className='px-10' onClick={onDialogSubmit} type='button'>
					{t("submit")}
				</Button>
			</Footer>
		</div>
	)
}

export default BulkRequestsCreationConfirmDialogContent
