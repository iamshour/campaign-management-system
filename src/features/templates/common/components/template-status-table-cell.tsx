//#region Import
import { Badge } from "@/ui"
import { useTranslation } from "react-i18next"

import type { TemplateStatus } from "../types"

import templateStatusesLocaleMap from "../constants/template-statuses-local-map"
//#endregion

const TemplateStatusTableCell = ({ status }: { status: TemplateStatus }) => {
	const { t } = useTranslation("templates-common")

	return (
		<Badge className='rounded-md' key={status} style={{ backgroundColor: smsTemplateStatusesColorsMap[status] }}>
			{t(templateStatusesLocaleMap[status])}
		</Badge>
	)
}

export default TemplateStatusTableCell

const smsTemplateStatusesColorsMap: Record<TemplateStatus, string> = {
	DRAFT: "#DBDBDB",
	PUBLISHED: "#9EC654",
}
