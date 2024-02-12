import type { IconType } from "@/ui"

import appPaths from "./app-paths"

import BiBarChartFill from "~icons/bi/bar-chart-fill"
import IcBaselineCampaign from "~icons/ic/baseline-campaign"
import IcBaselineInsertDriveFile from "~icons/ic/baseline-insert-drive-file"
import IcRoundMoveToInbox from "~icons/ic/round-move-to-inbox"
import IcRoundPermContactCalendar from "~icons/ic/round-perm-contact-calendar"
import MaterialSymbolsLightLabProfileSharp from "~icons/material-symbols-light/lab-profile-sharp"
import MdiVirus from "~icons/mdi/virus"
import RiRobot2Fill from "~icons/ri/robot-2-fill"
import TablerAppsFilled from "~icons/tabler/apps-filled"

type NavElementProps = {
	/**
	 * Translated String to be displayed for end-users in the navbar
	 */
	label: string

	/**
	 * Icon passed to be displayed in the navbar
	 */
	Icon: IconType
} & (
	| {
			/**
			 * Type of element to be used in the navbar, could be a `nav-link` or `accordion`
			 */
			type: "nav-link"

			/**
			 * Path to be navigated to when this element is clicked
			 */
			path: string
	  }
	| {
			/**
			 * Type of element to be used in the navbar, could be a `nav-link` or `accordion`
			 */
			type: "accordion"

			/**
			 * List of links to be displayed inside a navbar accordion
			 */
			content: Record<"label" | "path", string>[]
	  }
)

const navElements: NavElementProps[] = [
	{
		type: "nav-link",
		label: "navbar.nav-elements.dashboard",
		path: appPaths.DASHBOARD,
		Icon: BiBarChartFill,
	},
	{
		type: "nav-link",
		label: "navbar.nav-elements.inbox",
		path: appPaths.INBOX,
		Icon: IcRoundMoveToInbox,
	},
	{
		type: "nav-link",
		label: "navbar.nav-elements.integrations",
		path: appPaths.INTEGRATIONS,
		Icon: TablerAppsFilled,
	},
	{
		type: "nav-link",
		label: "navbar.nav-elements.industies",
		path: appPaths.INDUSTRIES,
		Icon: MaterialSymbolsLightLabProfileSharp,
	},
	{
		type: "accordion",
		label: "navbar.nav-elements.people.title",
		Icon: IcRoundPermContactCalendar,
		content: [
			{
				label: "navbar.nav-elements.people.elements.contacts",
				path: appPaths.CONTACTS,
			},
			{
				label: "navbar.nav-elements.people.elements.groups",
				path: appPaths.GROUPS,
			},
			{
				label: "navbar.nav-elements.people.elements.exports",
				path: appPaths.EXPORTS,
			},
			{
				label: "navbar.nav-elements.people.elements.segments",
				path: appPaths.SEGMENTS,
			},
		],
	},
	{
		type: "accordion",
		label: "navbar.nav-elements.templates.title",
		Icon: IcBaselineInsertDriveFile,
		content: [
			{
				label: "navbar.nav-elements.templates.elements.smsTemplates",
				path: appPaths.SMS_TEMPLATES,
			},
		],
	},
	{
		type: "nav-link",
		label: "navbar.nav-elements.campaigns",
		path: appPaths.CAMPAIGNS_MANAGER,
		Icon: IcBaselineCampaign,
	},
	{
		type: "accordion",
		label: "navbar.nav-elements.channels.title",
		Icon: MdiVirus,
		content: [
			{
				label: "navbar.nav-elements.channels.elements.whatsapp",
				path: appPaths.CHANNELS,
			},
		],
	},
	{
		type: "accordion",
		label: "navbar.nav-elements.chatbot.title",
		Icon: RiRobot2Fill,
		content: [
			{
				label: "navbar.nav-elements.chatbot.elements.page-1",
				path: appPaths.CHATBOT,
			},
		],
	},
]
export default navElements
