//#region Import
import type { ChannelSource } from "@/features/channels/common/types/data.types"

import DataViewDateCell from "@/core/components/data-view/data-view-date-cell"
import TemplateTypesTableColumn from "@/features/templates/common/components/template-types-table-cell"
import { Button, Skeleton } from "@/ui"
import BitcoinIconsVisibleFilled from "~icons/bitcoin-icons/visible-filled"
import IcRoundSender from "~icons/ic/round-group"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next"

const ChannelSourcesGridViewTableActions = lazy(() => import("./channel-sources-grid-view-table-actions"))
//#endregion

const ChannelSourceCard = ({ channelSourceName, createdAt = "", id, templateTypes }: ChannelSource) => {
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
						{t("grid.card.sender")}: {channelSourceName}
					</p>
				</div>

				<Suspense fallback={<Skeleton className='h-[40px] w-[40px]' />}>
					<ChannelSourcesGridViewTableActions channelSourceName={channelSourceName} />
				</Suspense>
			</div>

			<ul className='w-full flex-1 space-y-2 p-4'>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("channels-common:fields.type")}:</span>
					<TemplateTypesTableColumn types={templateTypes} />
				</li>
				<li className='flex gap-2 text-base'>
					<span className='inline whitespace-nowrap text-[#8F8F8F]'>{t("channels-common:fields.createdAt")}:</span>
					<DataViewDateCell date={createdAt} dateFormat='MM-dd-yyyy | hh:mm aaa' />
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

export default ChannelSourceCard
