//#region Import
import SmsSendersEmptySvg from "@/assets/sms-senders-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import { Button } from "@/ui"
//#endregion

const SmsSendersEmptyView = () => {
	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints
				labels={[
					"Lorem ipsum dolor sit amet.",
					"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
				]}
			/>

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<SmsSendersEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>You don&apos;t have sender ID yet</h3>
				<p className='mb-6 text-center'>Request a Sender ID in order to start sending you&apos;re campaigns</p>
				<Button className='h-min px-10 py-3'>Activate Local SMS</Button>
			</div>
		</div>
	)
}

export default SmsSendersEmptyView
