//#region Import
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
//#endregion

const NoResultsFound = ({ className }: { className?: string }) => {
	const { t } = useTranslation("ui")

	return (
		<div className={twMerge("h-full w-full flex-1 p-4 flex-center", className)}>
			<h2 className='text-center text-2xl font-light uppercase tracking-widest text-gray-500'>
				{t("noResultsComponent")}
			</h2>
		</div>
	)
}

export default NoResultsFound
