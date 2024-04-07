//#region Import
import { type IconType, Tabs } from "@/ui"
import IcSharpFileCopy from "~icons/ic/sharp-file-copy"
import PajamasImport from "~icons/pajamas/import"
import { lazy } from "react"
import { useTranslation } from "react-i18next"

import type { ImportType } from "../types"

import { useImportContactsDialogContext } from "../import-contacts-dialog-context"

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
		<Tabs onValueChange={(importType) => updateData({ importType })} value={importType}>
			<Tabs.List className='h-max w-full justify-evenly gap-8 bg-transparent'>
				<TriggerCard
					description={t("tabs.importFile.description")}
					icon={PajamasImport}
					title={t("tabs.importFile.title")}
					value='file'
				/>

				<TriggerCard
					description={t("tabs.copyPaste.description")}
					icon={IcSharpFileCopy}
					title={t("tabs.copyPaste.title")}
					value='copyPaste'
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
	description: string
	icon: IconType
	title: string
	value: ImportType
}

const TriggerCard = ({ description, title, value, ...props }: TriggerCardProps) => (
	<Tabs.Trigger
		className='data-[state=active:ring-primary-600 flex h-full w-[382px] max-w-full flex-col gap-1 rounded-lg bg-white p-4 data-[state=active]:ring-2 focus-visible:ring-primary-600'
		value={value}>
		<props.icon className='text-xl text-primary-600' />
		<h3 className='mb-2'>{title}</h3>
		<p className='hidden whitespace-break-spaces font-normal sm:block'>{description}</p>
	</Tabs.Trigger>
)
