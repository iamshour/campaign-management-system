//#region Import
import type { UserRole } from "@/features/authentication/types"
import type { IconType } from "@/ui"

import BiBarChartFill from "~icons/bi/bar-chart-fill"
import IcBaselineCampaign from "~icons/ic/baseline-campaign"
import IcBaselineInsertDriveFile from "~icons/ic/baseline-insert-drive-file"
import IcRoundMoveToInbox from "~icons/ic/round-move-to-inbox"
import IcRoundPermContactCalendar from "~icons/ic/round-perm-contact-calendar"
import MaterialSymbolsLightLabProfileSharp from "~icons/material-symbols-light/lab-profile-sharp"
import MdiVirus from "~icons/mdi/virus"
import RiRobot2Fill from "~icons/ri/robot-2-fill"
import TablerAppsFilled from "~icons/tabler/apps-filled"

import appPaths from "./app-paths"
//#endregion

type NavElementProps = {
	/**
	 * Icon passed to be displayed in the navbar
	 */
	Icon: IconType

	/**
	 * Translated String to be displayed for end-users in the navbar
	 */
	label: string

	roles: UserRole[]
} & (
	| {
			/**
			 * List of links to be displayed inside a navbar accordion
			 */
			content: Record<"label" | "path", string>[]

			/**
			 * Type of element to be used in the navbar, could be a `nav-link` or `accordion`
			 */
			type: "accordion"
	  }
	| {
			/**
			 * Path to be navigated to when this element is clicked
			 */
			path: string

			/**
			 * Type of element to be used in the navbar, could be a `nav-link` or `accordion`
			 */
			type: "nav-link"
	  }
)

const navElements: NavElementProps[] = [
	{
		Icon: BiBarChartFill,
		label: "navbar.nav-elements.dashboard",
		path: appPaths.DASHBOARD,
		roles: ["BLUE", "BUSINESS"],
		type: "nav-link",
	},
	{
		Icon: IcRoundMoveToInbox,
		label: "navbar.nav-elements.inbox",
		path: appPaths.INBOX,
		roles: ["BLUE", "BUSINESS"],
		type: "nav-link",
	},
	{
		Icon: TablerAppsFilled,
		label: "navbar.nav-elements.integrations",
		path: appPaths.INTEGRATIONS,
		roles: ["BLUE", "BUSINESS"],
		type: "nav-link",
	},
	{
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
		Icon: IcRoundPermContactCalendar,
		label: "navbar.nav-elements.people.title",
		roles: ["BLUE", "BUSINESS"],
		type: "accordion",
	},
	{
		content: [
			{
				label: "navbar.nav-elements.templates.elements.smsTemplates",
				path: appPaths.SMS_TEMPLATES,
			},
		],
		Icon: IcBaselineInsertDriveFile,
		label: "navbar.nav-elements.templates.title",
		roles: ["BUSINESS"],
		type: "accordion",
	},
	{
		Icon: MaterialSymbolsLightLabProfileSharp,
		label: "navbar.nav-elements.industries",
		path: appPaths.INDUSTRIES,
		roles: ["BLUE"],
		type: "nav-link",
	},
	{
		content: [
			{
				label: "navbar.nav-elements.channels.elements.smsSendersManagementLocal",
				path: "admin/channels/local-sms",
			},
			{
				label: "navbar.nav-elements.channels.elements.smsSendersManagementInternational",
				path: "admin/channels/international-sms",
			},
			{
				label: "navbar.nav-elements.channels.elements.smsChannels",
				path: appPaths.SMS_SENDERS,
			},
		],
		Icon: MdiVirus,
		label: "navbar.nav-elements.channels.title",
		roles: ["BLUE", "BUSINESS"],
		type: "accordion",
	},
	{
		Icon: IcBaselineCampaign,
		label: "navbar.nav-elements.campaigns",
		path: appPaths.CAMPAIGNS_MANAGER,
		roles: ["BLUE", "BUSINESS"],
		type: "nav-link",
	},
	{
		content: [
			{
				label: "navbar.nav-elements.chatbot.elements.page-1",
				path: appPaths.CHATBOT,
			},
		],
		Icon: RiRobot2Fill,
		label: "navbar.nav-elements.chatbot.title",
		roles: ["BLUE", "BUSINESS"],
		type: "accordion",
	},
]

export default navElements
