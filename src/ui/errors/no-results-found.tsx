//#region Import
import { useTranslation } from "react-i18next"
//#endregion

const NoResultsFound = () => {
	const { t } = useTranslation("ui")

	return (
		<div className='h-full w-full flex-1 p-4 flex-center'>
			<h2 className='text-center text-2xl font-light uppercase tracking-widest text-gray-500'>
				{t("noResultsComponent")}
			</h2>
		</div>
	)
}

export default NoResultsFound
