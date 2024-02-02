//#region Import
import { Dialog } from "@/ui"
import { useState, lazy } from "react"
import { useTranslation } from "react-i18next"

const AdvancedFiltersDialogContext = lazy(() => import("./advanced-filters-dialog-context"))
const AdvancedFiltersDialogContent = lazy(() => import("./advanced-filters-dialog-content"))
//#endregion

interface AdvancedFiltersDialogProps {
	/**
	 * Trigger Button/Element for triggering Dilaog
	 */
	children: React.ReactNode
}

const AdvancedFiltersDialog = ({ children }: AdvancedFiltersDialogProps) => {
	const { t } = useTranslation("contacts")

	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content
				className=' h-[801px] w-[450px] sm:h-[713px] sm:w-[1300px]'
				title={t("dialogs.advancedFilters.title")}
				onInteractOutside={(e) => e.preventDefault()}>
				<AdvancedFiltersDialogContext>
					<AdvancedFiltersDialogContent onClose={() => setIsOpen(false)} />
				</AdvancedFiltersDialogContext>
			</Dialog.Content>
		</Dialog>
	)
}

export default AdvancedFiltersDialog
