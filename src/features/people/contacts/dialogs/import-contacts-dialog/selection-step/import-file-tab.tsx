//#region Import
import { DropFileArea, ErrorBoundary } from "@/ui"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import fileMimeTypes from "@/core/constants/file-mime-types"

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
		uploadFileLoading,
		resetData,
		updateData,
	} = useImportContactsDialogContext()

	return (
		<ErrorBoundary>
			<DropFileArea
				name='file'
				acceptedFiles={!uploadFileLoading && file ? [file] : []}
				onRemove={resetData}
				accept={fileMimeTypes}
				onDrop={(acceptedFiles) => updateData({ file: acceptedFiles[0] })}
				onDropRejected={(fileRejections) => {
					fileRejections[0].errors.forEach(({ code }) =>
						toast.error(t(`tabs.importFile.errors.${code}`, { count: 50 }))
					)
				}}
				preventDropOnDocument
				disabled={!!file?.name.length}
				maxSize={MAX_FILE_SIZE}
				maxFiles={1}
				multiple={false}
				loading={uploadFileLoading}
			/>
		</ErrorBoundary>
	)
}

export default ImportFileTab
