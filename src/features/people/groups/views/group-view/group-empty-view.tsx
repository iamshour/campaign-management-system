//#region Import
import ContactsEmptySvg from "@/assets/contacts-empty.svg?react"
import LabelledHints from "@/core/components/labelled-hints"
import { Button } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const GroupEmptyView = () => {
	const { t } = useTranslation("groups", { keyPrefix: "views.groupEmptyView" })

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
				<h3 className='text-center text-xl font-bold sm:text-[22px]'>{t("headline")}</h3>
				<p className='mb-6 text-center'>{t("message")}</p>

				<Button as='link' className='mx-auto min-w-[200px]' to='./add-contacts'>
					{t("submit")}
				</Button>
			</div>
		</div>
	)
}

export default GroupEmptyView
