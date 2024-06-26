//#region Import
import ContactsEmptySvg from "@/assets/contacts-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import CreateContactDialog from "@/features/people/contacts/dialogs/create-contact-dialog/create-contact-dialog"
import ImportContactsDialog from "@/features/people/contacts/dialogs/import-contacts-dialog/import-contacts-dialog"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const ContactsEmptyView = () => {
	const { t } = useTranslation("contacts")

	return (
		<div className='flex h-full w-full flex-col p-4'>
			<LabelledHints
				labels={[
					"You can click on the import section.",
					"You can create new contacts or import your own list of contacts to start sending you campaigns.",
				]}
			/>

			<div className='h-full flex-1 flex-col gap-[14px] flex-center'>
				<ContactsEmptySvg className='mb-[30px]' />
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("emptyView.headline")}</h3>
				<p className='mb-6 text-center'>{t("emptyView.message")}</p>
				<div className='flex-wrap gap-8 flex-center'>
					<ImportContactsDialog title={t("dialogs.importContacts.title")}>
						<Button className='min-w-[200px]' size='default' variant='outline'>
							{t("table.topbar.actions.import")}
						</Button>
					</ImportContactsDialog>

					<CreateContactDialog>
						<Button className='min-w-[200px]' size='default'>
							{t("table.topbar.actions.add-contact")}
						</Button>
					</CreateContactDialog>
				</div>
			</div>
		</div>
	)
}

export default ContactsEmptyView
