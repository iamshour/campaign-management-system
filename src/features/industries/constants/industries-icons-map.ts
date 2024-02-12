//#region Import
import { lazy } from "react"

import type { IconType } from "@/ui"
//#endregion

// Keys of Icons to be used for Industries. To be provided by Marketing/Design team
export type IndustryIcon =
	| "FlatColorIconsFactory"
	| "FlatColorIconsHighPriority"
	| "FlatColorIconsKey"
	| "FlatColorIconsBadDecision"
	| "FlatColorIconsEngineering"
	| "FlatColorIconsElectronics"
	| "FlatColorIconsAbout"
	| "BiBarChartFill"
	| "IcBaselineCampaign"
	| "IcBaselineInsertDriveFile"
	| "IcRoundMoveToInbox"
	| "IcRoundPermContactCalendar"
	| "IonAmericanFootballSharp"
	| "IonAnalytics"
	| "IonAndroidBulb"
	| "IonArchiveSharp"
	| "IonArrowForwardCircle"
	| "IonArrowRightA"
	| "IonArrowSwap"
	| "IonArrowUndoCircle"
	| "IonAtCircle"
	| "IonBackspaceOutline"
	| "IonBagAddSharp"
	| "IonBarbell"
	| "IonBaseball"
	| "IonBasketball"
	| "IonBatteryHalf"
	| "IonBicycle"
	| "IonBonfire"
	| "IonCalendarSharp"
	| "IonCameraSharp"
	| "IonCash"
	| "MaterialSymbolsLightLabProfileSharp"
	| "MdiVirus"
	| "RiRobot2Fill"
	| "TablerAppsFilled"

const industriesIconsMap: Record<IndustryIcon, React.LazyExoticComponent<IconType>> = {
	FlatColorIconsFactory: lazy(() => import("~icons/flat-color-icons/factory")),
	FlatColorIconsHighPriority: lazy(() => import("~icons/flat-color-icons/high-priority")),
	FlatColorIconsKey: lazy(() => import("~icons/flat-color-icons/key")),
	FlatColorIconsBadDecision: lazy(() => import("~icons/flat-color-icons/bad-decision")),
	FlatColorIconsEngineering: lazy(() => import("~icons/flat-color-icons/engineering")),
	FlatColorIconsElectronics: lazy(() => import("~icons/flat-color-icons/electronics")),
	FlatColorIconsAbout: lazy(() => import("~icons/flat-color-icons/about")),
	BiBarChartFill: lazy(() => import("~icons/bi/bar-chart-fill")),
	IcBaselineCampaign: lazy(() => import("~icons/ic/baseline-campaign")),
	IcBaselineInsertDriveFile: lazy(() => import("~icons/ic/baseline-insert-drive-file")),
	IcRoundMoveToInbox: lazy(() => import("~icons/ic/round-move-to-inbox")),
	IcRoundPermContactCalendar: lazy(() => import("~icons/ic/round-perm-contact-calendar")),
	IonAmericanFootballSharp: lazy(() => import("~icons/ion/american-football-sharp")),
	IonAnalytics: lazy(() => import("~icons/ion/analytics")),
	IonAndroidBulb: lazy(() => import("~icons/ion/android-bulb")),
	IonArchiveSharp: lazy(() => import("~icons/ion/archive-sharp")),
	IonArrowForwardCircle: lazy(() => import("~icons/ion/arrow-forward-circle")),
	IonArrowRightA: lazy(() => import("~icons/ion/arrow-right-a")),
	IonArrowSwap: lazy(() => import("~icons/ion/arrow-swap")),
	IonArrowUndoCircle: lazy(() => import("~icons/ion/arrow-undo-circle")),
	IonAtCircle: lazy(() => import("~icons/ion/at-circle")),
	IonBackspaceOutline: lazy(() => import("~icons/ion/backspace-outline")),
	IonBagAddSharp: lazy(() => import("~icons/ion/bag-add-sharp")),
	IonBarbell: lazy(() => import("~icons/ion/barbell")),
	IonBaseball: lazy(() => import("~icons/ion/baseball")),
	IonBasketball: lazy(() => import("~icons/ion/basketball")),
	IonBatteryHalf: lazy(() => import("~icons/ion/battery-half")),
	IonBicycle: lazy(() => import("~icons/ion/bicycle")),
	IonBonfire: lazy(() => import("~icons/ion/bonfire")),
	IonCalendarSharp: lazy(() => import("~icons/ion/calendar-sharp")),
	IonCameraSharp: lazy(() => import("~icons/ion/camera-sharp")),
	IonCash: lazy(() => import("~icons/ion/cash")),
	MaterialSymbolsLightLabProfileSharp: lazy(() => import("~icons/material-symbols-light/lab-profile-sharp")),
	MdiVirus: lazy(() => import("~icons/mdi/virus")),
	RiRobot2Fill: lazy(() => import("~icons/ri/robot-2-fill")),
	TablerAppsFilled: lazy(() => import("~icons/tabler/apps-filled")),
}

export default industriesIconsMap
