//#region Import
import type { Selection } from "@/core/components/data-view/types"

import { selectSelection } from "@/core/components/data-view/data-view-slice"
import useSelector from "@/core/hooks/useSelector"
import CreateContactDialog from "@/features/people/contacts/dialogs/create-contact-dialog/create-contact-dialog"
import ImportContactsDialog from "@/features/people/contacts/dialogs/import-contacts-dialog/import-contacts-dialog"
import ExportFieldsDialog from "@/features/people/exports/dialogs/export-fields-dialog/export-fields-dialog"
import { Button, Skeleton } from "@/ui"
import PajamasImport from "~icons/pajamas/import"
import PhUserPlus from "~icons/ph/user-plus"
import { memo, Suspense } from "react"
import { useTranslation } from "react-i18next"

import MultiEditDropdown from "./multi-edit-dropdown"
//#endregion

const ContactsViewTopbar = memo(() => {
	const { t } = useTranslation("contacts")

	const selection = useSelector<Selection>((state) => selectSelection(state, "contacts"))

	return (
		<div className='flex flex-1 justify-between'>
			<div className='flex gap-2'>
				{(selection === "ALL" || !!selection?.length) && (
					<Suspense fallback={<Skeleton className='h-[36px] w-[140px]' />}>
						<MultiEditDropdown />
					</Suspense>
				)}

				<ExportFieldsDialog exportsType='contacts'>
					<Button className='px-1' variant='link'>
						{t("ui:table.actions.export.label", { count: selection === "ALL" || !selection?.length ? 2 : 1 })}
					</Button>
				</ExportFieldsDialog>
			</div>

			<div className='flex gap-4'>
				<ImportContactsDialog title={t("dialogs.importContacts.title")}>
					<Button variant='outline'>
						<PajamasImport />
						{t("table.toolbar.actions.import")}
					</Button>
				</ImportContactsDialog>

				<CreateContactDialog>
					<Button>
						<PhUserPlus />
						{t("table.toolbar.actions.add-contact")}
					</Button>
				</CreateContactDialog>
			</div>
		</div>
	)
})

ContactsViewTopbar.displayName = "ContactsViewTopbar"

export default ContactsViewTopbar
