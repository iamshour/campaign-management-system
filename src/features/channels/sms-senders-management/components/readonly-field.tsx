import { Label } from "@/ui"
import { useTranslation } from "react-i18next"

interface ReadonlyFieldProps {
	children: React.ReactNode

	/**
	 * Label called from localization namespace ("senders-management:fields.FIELD_NAME")
	 */
	label: string
}

const ReadonlyField = ({ children, label }: ReadonlyFieldProps) => {
	const { t } = useTranslation("senders-management", { keyPrefix: "fields" })

	return (
		<div className='space-x-2 rounded-lg border border-[#E0E0E0] bg-white p-2'>
			<Label className='text-base font-bold text-black'>{t(label)}</Label>

			<p className='line-clamp-3 text-base text-black'>{children}</p>
		</div>
	)
}

export default ReadonlyField
