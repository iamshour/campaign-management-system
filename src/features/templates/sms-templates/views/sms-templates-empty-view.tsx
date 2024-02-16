//#region Import
import { useLocation, useNavigate } from "react-router-dom"

import SmsTemplatesEmptySvg from "@/assets/sms-templates-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import { Button } from "@/ui"
//#endregion

const SmsTemplatesEmptyView = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

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
				<SmsTemplatesEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>You don&apos;t have templates yet</h3>
				<p className='mb-6 text-center'>
					Create a new template or use our predefined templates to start sending your campaigns
				</p>
				<Button onClick={() => navigate("new-template", { state: { from: pathname } })} className='h-min px-10 py-3'>
					Create Template
				</Button>
			</div>
		</div>
	)
}

export default SmsTemplatesEmptyView
