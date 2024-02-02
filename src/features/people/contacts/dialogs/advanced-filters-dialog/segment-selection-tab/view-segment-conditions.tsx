//#region Import
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { Button, Tooltip } from "@/ui"

import type { SegmentSelectionRenderedViewProps } from "."

import MdiFileDocument from "~icons/mdi/file-document"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"

const SegmentsFunnelReadonly = lazy(() => import("@/features/people/segments/components/segments-funnel-readonly"))
//#endregion

const SegmentConditionsViewContent = ({ setView, segment }: SegmentSelectionRenderedViewProps) => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.advancedFilters.segment" })

	return (
		<div className='relative flex flex-1 flex-col gap-4 overflow-hidden rounded-xl bg-[#F7F7F7]'>
			<div className='flex w-full flex-col overflow-y-auto'>
				<div className='flex flex-row'>
					<div className='flex w-full flex-1 items-start justify-start gap-4 prevent-selection [&>svg:nth-of-type(2)]:me-4 [&>svg:nth-of-type(2)]:ms-auto [&>svg:nth-of-type(2)]:h-6 [&>svg:nth-of-type(2)]:w-6 [&>svg:nth-of-type(2)]:self-center'>
						<MdiFileDocument className='text-xl text-primary-600' />

						<div className='flex flex-col items-start gap-1.5'>
							<h3 className='text-xl font-bold'>{t(`title`)}</h3>
							<h4 className='text-xl font-normal text-[#545454]'>{t(`editSegmentSubtitle`)}</h4>
						</div>
					</div>

					<div className='absolute right-[30px] z-10 flex flex-row items-center rounded-lg bg-[#F7F7F7] p-2'>
						<Button
							type='button'
							className='h-max px-1.5 py-0 pb-0.5 text-primary-600 underline hover:bg-transparent hover:text-primary-900'
							variant='text'
							size='sm'
							onClick={() => setView("editSegmentConditions")}>
							{t(`editSegment.editButton`)}
						</Button>

						<Tooltip key={"tooltip"}>
							<Tooltip.Trigger asChild>
								<span className='w-max'>
									<MdiInformationVariantCircle className='text-lg text-[#054060]' />
								</span>
							</Tooltip.Trigger>
							<Tooltip.Content content={t("editSegment.tooltip")} side='top' align='end' sideOffset={10} />
						</Tooltip>
					</div>
				</div>

				<div className='mt-6 flex flex-col gap-6 pe-3'>
					<SegmentsFunnelReadonly conditions={segment.conditions} />
				</div>
			</div>
		</div>
	)
}

export default SegmentConditionsViewContent
