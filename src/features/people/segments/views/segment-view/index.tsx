//#region Import
//#region Import
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import { Button, type IconType } from "@/ui"

import SegmentsFunnelReadonly from "../../components/segments-funnel-readonly"
import type { Segment, SegmentConditionType } from "../../types"

import MaterialSymbolsEdit from "~icons/material-symbols/edit"
import MdiFileDocument from "~icons/mdi/file-document"
import MdiInformationVariantCircle from "~icons/mdi/information-variant-circle"
//#endregion

const SegmentView = ({
	name,
	description,
	conditions,
}: Pick<Segment, "name" | "description"> & {
	conditions?: SegmentConditionType[]
}) => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { t } = useTranslation("segments", { keyPrefix: "views" })

	return (
		<div className='flex h-full w-full flex-col gap-6 p-6'>
			<div className='flex justify-between'>
				<h2 className='text-[21px] font-medium'>{t(`viewSegment.title`)}</h2>

				<Button variant='link' size='sm' onClick={() => navigate(`./edit-segment`, { state: { from: pathname } })}>
					<MaterialSymbolsEdit />
					{t("viewSegment.actions.editSegment")}
				</Button>
			</div>

			<div className='flex h-full w-full flex-col gap-10 overflow-hidden rounded-xl bg-[#F7F7F7] p-6'>
				<div>
					<TitleWithIcon title={t("editableSegmentView.items.basicInfo.title")} icon={MdiInformationVariantCircle} />

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
					<TitleWithIcon title={t("editableSegmentView.items.conditions.title")} icon={MdiFileDocument} />

					<SegmentsFunnelReadonly conditions={conditions} className='overflow-y-auto' />
				</div>
			</div>
		</div>
	)
}

export default SegmentView

export const TitleWithIcon = ({ title, icon: Icon }: { title: string; icon: IconType }) => (
	<div className='flex items-center gap-3'>
		<Icon className='h-6 w-6 shrink-0 text-primary-700' />
		<h3 className='text-xl font-bold text-black'>{title}</h3>
	</div>
)
