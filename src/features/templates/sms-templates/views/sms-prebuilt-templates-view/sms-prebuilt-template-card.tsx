//#region Import
import { memo } from "react"
import { twMerge } from "tailwind-merge"

import WavySvg from "@/assets/prebuilt-template-card-wavy.svg?react"
import type { SmsIndustryTemplateType } from "@/features/industries/types"
import { smsTemplateTypesLocaleMap } from "@/features/templates/sms-templates/constants/sms-template-types-options"
//#endregion

const SmsPrebuiltTemplateCard = memo(
	({
		name,
		type,
		language,
		body,
		industryId,
		background,
		className,
	}: Partial<Pick<SmsIndustryTemplateType, "name" | "type" | "language" | "body" | "industryId" | "background">> & {
		className?: string
	}) => {
		const backgroundImage = background?.length ? `url('${background}')` : "#4cb0e6"

		return (
			<div
				className={twMerge(
					"relative h-[285px] w-[377px] cursor-pointer overflow-hidden rounded-2xl border-2 prevent-selection transition-basic hover:border-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600",
					className
				)}>
				<div
					style={{ background: backgroundImage }}
					className='h-[70%] w-full bg-cover p-4 before:absolute before:left-0 before:right-0 before:top-0 before:h-36 before:w-full before:bg-gradient-to-t before:from-black/0 before:to-black/60 before:[content:""]'>
					<p className='relative z-10 text-white'>
						<span className='font-light'>Industry: </span>
						{industryId?.length ? industryId : "N/A"}
					</p>
					<p className='relative z-10 inline text-white'>
						<span className='font-light'>Type: </span>
						{type ? smsTemplateTypesLocaleMap[type] : "N/A"} |
					</p>{" "}
					<p className='relative z-10 inline text-white'>
						<span className='font-light'>Language: </span>
						{language?.length ? language : "N/A"}
					</p>
				</div>

				<div className='relative w-full p-4 pt-0'>
					<WavySvg className='absolute -top-10 left-0 right-0' />
					<h4 className='relative z-10 text-primary-700'>{name?.length ? name : "N/A"}</h4>
					<p className='relative z-10 line-clamp-2 w-full'>{body?.length ? body : "N/A"}</p>
				</div>
			</div>
		)
	}
)

SmsPrebuiltTemplateCard.displayName = "SmsPrebuiltTemplateCard"

export default SmsPrebuiltTemplateCard
