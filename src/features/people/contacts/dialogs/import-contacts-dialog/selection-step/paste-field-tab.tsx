//#region Import
import { Textarea } from "@blueai/ui"

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
				name='pasteField'
				value={pastedContent || ""}
				onChange={(e) => updateData({ pastedContent: e.target.value })}
				className='h-full w-full resize-none'
				placeholder='Paste your fields here...'
				spellCheck={false}
			/>
		</div>
	)
}

export default PasteFieldTab
