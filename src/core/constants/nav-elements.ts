//#region Import
import type { UserRole } from "@/features/authentication/types"
import type { IconType } from "@/ui"

import IcBaselineCampaign from "~icons/ic/baseline-campaign"
import IcBaselineInsertDriveFile from "~icons/ic/baseline-insert-drive-file"
import IcRoundPermContactCalendar from "~icons/ic/round-perm-contact-calendar"
import MaterialSymbolsLightLabProfileSharp from "~icons/material-symbols-light/lab-profile-sharp"
import NetworkHierarchy from "~icons/streamline/interface-hierarchy-2-node-organization-links-structure-link-nodes-network-hierarchy"

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
		Icon: IcBaselineCampaign,
		label: "navbar.nav-elements.campaigns",
		path: appPaths.HOME,
		roles: ["ADMIN", "USER"],
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
		roles: ["ADMIN", "USER"],
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
		roles: ["USER"],
		type: "accordion",
	},
	{
		Icon: MaterialSymbolsLightLabProfileSharp,
		label: "navbar.nav-elements.industries",
		path: appPaths.INDUSTRIES,
		roles: ["ADMIN"],
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
				path: appPaths.CHANNELS,
			},
		],
		Icon: NetworkHierarchy,
		label: "navbar.nav-elements.channels.title",
		roles: ["ADMIN", "USER"],
		type: "accordion",
	},
]

export default navElements
