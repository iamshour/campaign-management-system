//#region Import
import type { SmsIndustryTemplateType } from "@/features/industries/types"

import WavySvg from "@/assets/prebuilt-template-card-wavy.svg?react"
import templateLanguagesLocaleMap from "@/features/templates/common/constants/template-languages-local-map"
import templateTypesLocaleMap from "@/features/templates/common/constants/template-types-local-map"
import { memo } from "react"
import { twMerge } from "tailwind-merge"
//#endregion

const SmsPrebuiltTemplateCard = memo(
	({
		backgroundImage,
		body,
		className,
		industryName,
		language,
		name,
		type,
	}: Partial<
		Pick<SmsIndustryTemplateType, "backgroundImage" | "body" | "industryName" | "language" | "name" | "type">
	> & {
		className?: string
	}) => {
		const backgroundToDisplay = backgroundImage?.length ? backgroundImage : "#4cb0e6"

		return (
			<div
				className={twMerge(
					`relative h-[285px] w-[377px] cursor-pointer overflow-hidden rounded-2xl border-2 prevent-selection transition-basic hover:border-primary-600
					 focus-visible:ring-2 focus-visible:ring-primary-600`,
					className
				)}>
				<div
					className={`h-[70%] w-full bg-cover p-4 before:absolute before:left-0 before:right-0 before:top-0 before:h-36 before:bg-gradient-to-t before:from-black/0 before:to-black/60
					 before:[content:""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-32 after:bg-gradient-to-b after:from-black/0 after:to-black/30 after:[content:""]`}
					style={{ background: `url(${backgroundToDisplay})` }}>
					<p className='relative z-10 text-white'>
						<span className='font-light'>Industry: </span>
						{industryName?.length ? industryName : "N/A"}
					</p>
					<p className='relative z-10 inline text-white'>
						<span className='font-light'>Type: </span>
						{type ? templateTypesLocaleMap[type] : "N/A"} |
					</p>{" "}
					<p className='relative z-10 inline text-white'>
						<span className='font-light'>Language: </span>
						{language?.length ? templateLanguagesLocaleMap[language] : "N/A"}
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
