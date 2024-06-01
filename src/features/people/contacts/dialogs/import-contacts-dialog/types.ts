//#region Import
import type {
	ImportFileMappingBody,
	ImportFileMappingReturnType,
	UploadContactsMutationReturnType,
} from "@/features/people/contacts/types"
import type { OptionType } from "@/ui"
//#endregion

/**
 * Type of imported entry: Could be `file` OR `copyPaste` relating to pasted text entry
 */
export type ImportType = "copyPaste" | "file"

export type ImportsDataType = Partial<UploadContactsMutationReturnType> &
	Partial<Omit<ImportFileMappingBody, "groups">> & {
		exportsFileName?: string

		/**
		 * Uploaded File if ImportType is file
		 */
		file?: File

		groups?: OptionType[]

		/**
		 * Type of imported entry: Could be `file` OR `copyPaste` relating to pasted text entry
		 */
		importType: ImportType

		/**
		 * Pasted Content, copied from either an excel or csv file
		 */
		pastedContent?: string

		validationResponse?: ImportFileMappingReturnType
	}

export type ImportContactsDialogContextValueType = {
	/**
	 * Number of current active step
	 */
	currentStep: number

	/**
	 * Data to be used and sent to the server
	 */
	data: ImportsDataType

	/**
	 * Callback function used to reset data
	 */
	resetData: () => void

	/**
	 * Callback function used to update data, by spreading previous data, and passing new ones
	 * @param updatedData New updated data
	 */
	updateData: (newData: Partial<ImportsDataType> | React.SetStateAction<ImportsDataType>) => void

	/**
	 * Boolean used if an asychronous action is pending
	 */
	uploadFileLoading?: boolean
}

export interface ImportContactsDialogContextProps {
	/**
	 * Children Nodes to be rendered
	 */
	children: React.ReactNode

	/**
	 * Callback function used to close the dialog
	 */
	onClose: () => void
}
