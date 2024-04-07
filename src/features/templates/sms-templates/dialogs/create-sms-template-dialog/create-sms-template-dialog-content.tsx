//#region Import
import TmplateSvg1 from "@/assets/template-creation-1.svg?react"
import { Button } from "@/ui"
import { useLocation } from "react-router-dom"

import CreateSmsPrebuiltTemplateDialog from "../create-sms-prebuilt-template-dialog/create-prebuilt-template-dialog"
//#endregion

const CreateSmsTemplateDialogContent = () => {
	const { pathname } = useLocation()

	return (
		<div className='flex flex-col justify-between gap-[44px] px-2 py-4'>
			<div className='flex flex-col items-end gap-4 rounded-xl bg-[#F7F7F7] p-6'>
				<div className='grid-cols-auto grid-rows-auto grid items-center gap-x-6 gap-y-1.5'>
					<div className='flex-center [grid-area:1/1/3/2]'>
						<TmplateSvg1 />
					</div>
					<h3 className='text-xl font-bold [grid-area:1/2/2/3]'>Prebuilt templates</h3>
					<p className='text-xl text-[#545454]'>
						Save time and create your template with our collection of predefined templates.
					</p>
				</div>

				<CreateSmsPrebuiltTemplateDialog>
					<Button className='min-w-[212px]' size='lg' variant='outline'>
						Prebuilt Templates
					</Button>
				</CreateSmsPrebuiltTemplateDialog>
			</div>

			<div className='flex flex-col items-end gap-4 rounded-xl bg-[#F7F7F7] p-6'>
				<div className='grid-cols-auto grid-rows-auto grid items-center gap-x-6 gap-y-1.5'>
					<div className='flex-center [grid-area:1/1/3/2]'>
						<TmplateSvg1 />
					</div>
					<h3 className='text-xl font-bold [grid-area:1/2/2/3]'>Create from scratch</h3>
					<p className='text-xl text-[#545454]'>
						Save time and create flows with our collection of predefined templates.
					</p>
				</div>

				<Button
					as='link'
					className='min-w-[212px]'
					size='lg'
					state={{ from: pathname }}
					to='new-template'
					variant='outline'>
					Create Template
				</Button>
			</div>
		</div>
	)
}

export default CreateSmsTemplateDialogContent
