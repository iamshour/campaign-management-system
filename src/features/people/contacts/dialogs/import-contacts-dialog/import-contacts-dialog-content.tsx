//#region Import
import { lazy } from "react"

import { useImportContactsDialogContext } from "./import-contacts-dialog-context"
//#endregion

const ImportContactsDialogContent = () => {
	const { currentStep } = useImportContactsDialogContext()

	const ComponenToRender = views[currentStep]

	return <ComponenToRender />
}

export default ImportContactsDialogContent

const views: Record<number, React.LazyExoticComponent<() => JSX.Element>> = {
	1: lazy(() => import("./selection-step/selection-step")),
	2: lazy(() => import("./mapping-step/mapping-step")),
	3: lazy(() => import("./review-step")),
}
