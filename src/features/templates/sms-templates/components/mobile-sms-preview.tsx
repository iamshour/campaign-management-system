//#region Import
import IcBaselineAccountCircle from "~icons/ic/baseline-account-circle"
import IcTwotoneArrowBackIosNew from "~icons/ic/twotone-arrow-back-ios-new"
import MaterialSymbolsAndroidCamera from "~icons/material-symbols/android-camera"
import MaterialSymbolsMicOutlineRounded from "~icons/material-symbols/mic-outline-rounded"
import RiAppStoreFill from "~icons/ri/app-store-fill"
import { twMerge } from "tailwind-merge"
//#endregion

interface MobileSmsPreviewProps {
	message: string
}
const MobileSmsPreview = ({ message }: MobileSmsPreviewProps) => {
	return (
		<div className='m-2 flex h-[600px] min-w-[355px] flex-col rounded-[40px] border-2 border-[#8F8F8F] bg-white'>
			<div className='relative flex h-[100px] w-full flex-col items-center justify-center rounded-t-[40px] border-b border-[#D9D9D9] bg-[#F6F6F6] pb-[5px] pt-[8px]'>
				<IcTwotoneArrowBackIosNew className='absolute left-[20px] top-[40%] text-[25px] text-[#0c74ef]' />
				<IcBaselineAccountCircle className='text-[50px] text-[#999999]' />
				<p className='text-[14px]'>SENDER ID</p>
			</div>
			<div className='w-full flex-1 overflow-y-auto'>
				<p
					className={twMerge(
						`relative mx-4 my-5 mb-[12px] min-h-[50px] max-w-[310px] self-start break-words rounded-[25px] bg-[#E5E5EA] px-[20px] py-[10px] leading-[24px] text-black
							before:absolute before:-left-[7px] before:bottom-0 before:h-[25px] before:w-[20px] before:rounded-br-[16px] before:bg-[#E5E5EA] before:content-['*']
							after:absolute after:-left-[26px] after:bottom-0 after:h-[25px] after:w-[26px] after:rounded-br-[10px] after:bg-white after:content-['*']
							`
					)}>
					{message}
				</p>
			</div>
			<div className='flex h-[70px] w-full flex-row flex-nowrap items-center justify-between space-x-2 rounded-b-[40px] px-[20px]'>
				<MaterialSymbolsAndroidCamera className='text-[27px] text-[#E5E5EA]' />
				<RiAppStoreFill className='text-[27px] text-[#E5E5EA]' />
				<div className='flex h-min flex-1 flex-row items-center justify-between rounded-[40px] border border-[#C4C4C4] px-[10px] py-[5px] text-[#C4C4C4]'>
					<p>Text Message</p>
					<MaterialSymbolsMicOutlineRounded className='text-[22px]' />
				</div>
			</div>
		</div>
	)
}

export default MobileSmsPreview
