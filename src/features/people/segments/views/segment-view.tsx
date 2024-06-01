//#region Import
import { Button, type IconType } from "@/ui"
import MaterialSymbolsEdit from "~icons/material-symbols/edit"
import MdiFileDocument from "~icons/mdi/file-document"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import type { Segment, SegmentConditionType } from "../types"

import SegmentsFunnelReadonly from "../components/segments-funnel-readonly/segments-funnel-readonly"
//#endregion

const SegmentView = ({
	conditions,
	description,
	name,
}: Pick<Segment, "description" | "name"> & {
	conditions?: SegmentConditionType[]
}) => {
	const { pathname } = useLocation()

	const { t } = useTranslation("segments", { keyPrefix: "views" })

	return (
		<div className='flex h-full w-full flex-col gap-6 p-6'>
			<div className='flex justify-between'>
				<h2 className='text-[21px] font-medium'>{t(`viewSegment.title`)}</h2>

				<Button as='link' size='sm' state={{ from: pathname }} to='./edit-segment' variant='link'>
					<MaterialSymbolsEdit />
					{t("viewSegment.actions.editSegment")}
				</Button>
			</div>

			<div className='flex h-full w-full flex-col gap-10 overflow-hidden rounded-xl bg-[#F7F7F7] p-6'>
				<div>
					<TitleWithIcon icon={MdiInformationVariantCircle} title={t("editableSegmentView.items.basicInfo.title")} />

					<p className='mt-4 truncate text-base font-bold text-black'>
						{t("viewSegment.fields.name")}: <span className='truncate font-normal'>{name}</span>
					</p>

					{!!description?.length && (
						<p className='mt-2 text-base font-bold text-black'>
							{t("viewSegment.fields.description")}: <span className='font-normal'>{description}</span>
						</p>
					)}
				</div>

				<div className='flex flex-1 flex-col gap-6 overflow-hidden'>
					<TitleWithIcon icon={MdiFileDocument} title={t("editableSegmentView.items.conditions.title")} />

					<SegmentsFunnelReadonly className='overflow-y-auto' conditions={conditions} />
				</div>
			</div>
		</div>
	)
}

export default SegmentView

export const TitleWithIcon = ({ icon: Icon, title }: { icon: IconType; title: string }) => (
	<div className='flex items-center gap-3'>
		<Icon className='h-6 w-6 shrink-0 text-primary-700' />
		<h3 className='text-xl font-bold text-black'>{title}</h3>
	</div>
)
