//#region Import
import type { SmsSenderType } from "@/features/channels/sms-senders/types"

import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import { Button, Skeleton } from "@/ui"
import BitcoinIconsVisibleFilled from "~icons/bitcoin-icons/visible-filled"
import IcRoundSender from "~icons/ic/round-group"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"
const SmsSendersGridViewTableActions = lazy(() => import("./sms-senders-grid-view-table-actions"))
//#endregion

const SmsSenderCard = ({ createdAt = "", id, name, type }: SmsSenderType) => {
	const { t } = useTranslation("sms-senders")

	return (
		<div className='flex h-[220px] w-[470px] max-w-full flex-col rounded-xl shadow-[0px_0px_6px_#00000021] 3xl:w-[480px]'>
			<div className='flex w-full justify-between gap-2 overflow-hidden border-b border-b-gray-200 p-4'>
				<div className='flex flex-1 items-center gap-2 overflow-hidden'>
					<span className='h-11 w-11 shrink-0 rounded-full bg-[#054060] flex-center'>
						<IcRoundSender className='text-lg text-white' />
						<p className='sr-only'>Sender Avatar</p>
					</span>
					<p className='flex-1 truncate text-base font-bold'>
						{t("grid.card.sender")}: {name}
					</p>
				</div>

				<Suspense fallback={<Skeleton className='h-[40px] w-[40px]' />}>
					<SmsSendersGridViewTableActions id={id} name={name} />
				</Suspense>
			</div>

			<ul className='w-full flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("fields.type")}:</span>
					<span className='block truncate' title={type}>
						{type}
					</span>
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("fields.createdAt")}:</span>
					<span className='block truncate'>
						<DataViewDateCell date={createdAt} dateFormat='MM-dd-yyyy' />
					</span>
				</li>
			</ul>

			<div className='border-t border-t-gray-200'>
				<Button as='link' className='w-full rounded-xl rounded-t-none' size='lg' to={id} variant='text'>
					<BitcoinIconsVisibleFilled className='h-6 w-6' />
					<span>{t("table.actions.viewAllTypes")}</span>
				</Button>
			</div>
		</div>
	)
}

export default SmsSenderCard
