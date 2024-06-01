//#region Import
import fileMimeTypes from "@/core/constants/file-mime-types"
import { DropFileArea, ErrorBoundary } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"
//#endregion

/**
 * Max File Size allowed, provided by Contacts-SRD: 50MB
 */
const MAX_FILE_SIZE = 1048576 * 50

const ImportFileTab = () => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.importContacts.fileSelection" })

	const {
		data: { file },
		resetData,
		updateData,
		uploadFileLoading,
	} = useImportContactsDialogContext()

	return (
		<ErrorBoundary>
			<DropFileArea
				accept={fileMimeTypes}
				acceptedFiles={!uploadFileLoading && file ? [file] : []}
				disabled={!!file?.name.length}
				loading={uploadFileLoading}
				maxFiles={1}
				maxSize={MAX_FILE_SIZE}
				multiple={false}
				name='file'
				onDrop={(acceptedFiles) => updateData({ file: acceptedFiles[0] })}
				onDropRejected={(fileRejections) => {
					fileRejections[0].errors.forEach(({ code }) =>
						toast.error(t(`tabs.importFile.errors.${code}`, { count: 50 }))
					)
				}}
				onRemove={resetData}
				preventDropOnDocument
			/>
		</ErrorBoundary>
	)
}

export default ImportFileTab
