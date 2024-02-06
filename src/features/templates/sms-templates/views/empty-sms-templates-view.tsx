//#region Import
import MySmsTemplatesEmptySvg from "@/assets/my-sms-templates-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
//#endregion

const EmptySmsTemplatesView = () => {
	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints
				// TODO: add translation
				labels={[
					"Lorem ipsum dolor sit amet.",
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
				]}
			/>

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<MySmsTemplatesEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>You don&apos;t have exports yet</h3>
				<p className='mb-6 text-center'>Create new segment to collect your contacts</p>
			</div>
		</div>
	)
}

export default EmptySmsTemplatesView
