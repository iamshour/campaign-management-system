//#region Import
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

import { smsTemplateTypesLocaleMap } from "@/features/templates/sms-templates/constants/sms-template-types-options"
import type { SmsPrebuiltTemplateType } from "@/features/templates/sms-templates/types"
//#endregion

const SmsPrebuiltTemplateCard = ({
	name,
	industryId,
	type,
	language,
	background,
	body,
	className,
	id,
}: SmsPrebuiltTemplateType & { className?: string }) => {
	return (
		<Link
			to={`./${id}`}
			className={twMerge(
				"relative h-[285px] w-[377px] cursor-pointer overflow-hidden rounded-2xl border-2 prevent-selection transition-basic hover:border-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600",
				className
			)}>
			<div
				style={{ backgroundImage: `url('${background}')` }}
				className='h-[70%] w-full bg-cover p-4 before:absolute before:left-0 before:right-0 before:top-0 before:h-36 before:w-full before:bg-gradient-to-t before:from-black/0 before:to-black/60 before:[content:""]'>
				<p className='relative z-10 text-white'>
					<span className='font-light'>Industry: </span>
					{industryId}
				</p>
				<p className='relative z-10 inline text-white'>
					<span className='font-light'>Type: </span>
					{smsTemplateTypesLocaleMap[type]} |
				</p>{" "}
				<p className='relative z-10 inline text-white'>
					<span className='font-light'>Language: </span>
					{language}
				</p>
			</div>

			<div className='relative w-full p-4 pt-0'>
				<WavySvg className='absolute -top-10 left-0 right-0' />
				<h4 className='relative z-10 text-primary-700'>{name}</h4>
				<p className='relative z-10 line-clamp-2 w-full'>{body}</p>
			</div>
		</Link>
	)
}

export default SmsPrebuiltTemplateCard

const WavySvg = ({ className }: { className?: string }) => (
	<svg className={className} viewBox='0 0 1440 490' version='1.1' xmlns='http://www.w3.org/2000/svg'>
		<defs>
			<linearGradient id='sw-gradient-0' x1='0' x2='0' y1='1' y2='0'>
				<stop stopColor='rgba(255, 255, 255, 1)' offset='0%'></stop>
				<stop stopColor='rgba(255, 255, 255, 1)' offset='100%'></stop>
			</linearGradient>
		</defs>
		<path
			fill='url(#sw-gradient-0)'
			d='M0,0L80,32.7C160,65,320,131,480,130.7C640,131,800,65,960,57.2C1120,49,1280,98,1440,98C1600,98,1760,49,1920,40.8C2080,33,2240,65,2400,81.7C2560,98,2720,98,2880,130.7C3040,163,3200,229,3360,285.8C3520,343,3680,392,3840,408.3C4000,425,4160,408,4320,343C4480,278,4640,163,4800,114.3C4960,65,5120,82,5280,98C5440,114,5600,131,5760,147C5920,163,6080,180,6240,212.3C6400,245,6560,294,6720,302.2C6880,310,7040,278,7200,236.8C7360,196,7520,147,7680,138.8C7840,131,8000,163,8160,212.3C8320,261,8480,327,8640,326.7C8800,327,8960,261,9120,261.3C9280,261,9440,327,9600,326.7C9760,327,9920,261,10080,212.3C10240,163,10400,131,10560,130.7C10720,131,10880,163,11040,204.2C11200,245,11360,294,11440,318.5L11520,343L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z'></path>
	</svg>
)
