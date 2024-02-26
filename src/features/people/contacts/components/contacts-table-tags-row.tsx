//#region Import
import { Badge } from "@/ui"
import { useTranslation } from "react-i18next"
//#endregion

const ContactsTableTagsRow = ({ tags }: { tags: string[] }) => {
	const { t } = useTranslation("contacts")

	return (
		<span className='flex gap-1 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:!h-[3px]'>
			{tags?.slice(0, 2)?.map((tag) => (
				<Badge className=' rounded-md px-2' key={tag}>
					{tag}
				</Badge>
			))}

			{tags?.length > 2 && (
				<Badge className='!min-w-max'>{t("table.rows.tagsRows.remainingTags", { count: tags?.length - 2 })}</Badge>
			)}
		</span>
	)
}

export default ContactsTableTagsRow
