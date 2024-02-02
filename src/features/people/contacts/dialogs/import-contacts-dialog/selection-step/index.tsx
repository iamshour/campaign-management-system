//#region Import
import { Tabs, type IconType } from "@/ui"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"
import type { ImportType } from "../types"

import IcSharpFileCopy from "~icons/ic/sharp-file-copy"
import PajamasImport from "~icons/pajamas/import"

const ImportFileTab = lazy(() => import("./import-file-tab"))
const PasteFieldTab = lazy(() => import("./paste-field-tab"))
//#endregion

const FileSelectionStep = () => {
	const { t } = useTranslation("contacts", { keyPrefix: "dialogs.importContacts.fileSelection" })

	const {
		data: { importType },
		updateData,
	} = useImportContactsDialogContext()

	return (
		<Tabs value={importType} onValueChange={(importType) => updateData({ importType })}>
			<Tabs.List className='h-max w-full justify-evenly gap-8 bg-transparent'>
				<TriggerCard
					value='file'
					icon={PajamasImport}
					title={t("tabs.importFile.title")}
					description={t("tabs.importFile.description")}
				/>

				<TriggerCard
					value='copyPaste'
					icon={IcSharpFileCopy}
					title={t("tabs.copyPaste.title")}
					description={t("tabs.copyPaste.description")}
				/>
			</Tabs.List>

			<Tabs.Content value='file'>
				<ImportFileTab />
			</Tabs.Content>
			<Tabs.Content value='copyPaste'>
				<PasteFieldTab />
			</Tabs.Content>
		</Tabs>
	)
}

export default FileSelectionStep

interface TriggerCardProps {
	value: ImportType
	icon: IconType
	title: string
	description: string
}

const TriggerCard = ({ value, title, description, ...props }: TriggerCardProps) => (
	<Tabs.Trigger
		value={value}
		className='data-[state=active:ring-primary-600 flex h-full w-[382px] max-w-full flex-col gap-1 rounded-lg bg-white p-4 data-[state=active]:ring-2 focus-visible:ring-primary-600'>
		<props.icon className='text-xl text-primary-600' />
		<h3 className='mb-2'>{title}</h3>
		<p className='hidden whitespace-break-spaces font-normal sm:block'>{description}</p>
	</Tabs.Trigger>
)
