//#region Import
import { lazy, useState } from "react"

import { Dialog, Button } from "@/ui"

import PhUserPlus from "~icons/ph/user-plus"

const CreateIndustryDialogContent = lazy(() => import("./create-industry-dialog-content"))
//#endregion

const CreateIndustryDialog = () => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button>
					<PhUserPlus />
					Create Industry
				</Button>
			</Dialog.Trigger>
			<Dialog.Content title='Create Industry' className='h-[485px] w-[288px] sm:h-[430px] sm:w-[390px]'>
				<CreateIndustryDialogContent onClose={() => setOpen(false)} />
			</Dialog.Content>
		</Dialog>
	)
}

export default CreateIndustryDialog
