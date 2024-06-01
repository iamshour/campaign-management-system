//#region Import
import SmsPrebuiltTemplatesRoute from "@/features/templates/sms-templates/routes/sms-prebuilt-templates-route"
import { Button } from "@/ui"
//#endregion

const CreatePrebuiltTemplateDialogContent = () => {
	return (
		<>
			<SmsPrebuiltTemplatesRoute prebuiltTemplatesGridKey='sms-prebuilt-templates-dialog' />
			<Button as='link' className='absolute end-4 top-16' size='sm' to='new-template'>
				+ Create From Scratch
			</Button>
		</>
	)
}

export default CreatePrebuiltTemplateDialogContent
