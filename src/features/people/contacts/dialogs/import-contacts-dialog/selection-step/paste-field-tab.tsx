//#region Import
import { Textarea } from "@/ui"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"
//#endregion

const PasteFieldTab = () => {
	const {
		data: { pastedContent },
		updateData,
	} = useImportContactsDialogContext()

	return (
		<div className='h-full w-full rounded-xl bg-white p-4'>
			<Textarea
				className='h-full w-full resize-none'
				name='pasteField'
				onChange={(e) => updateData({ pastedContent: e.target.value })}
				placeholder='Paste your fields here...'
				spellCheck={false}
				value={pastedContent || ""}
			/>
		</div>
	)
}

export default PasteFieldTab
