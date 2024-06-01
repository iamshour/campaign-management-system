/* eslint-disable perfectionist/sort-objects*/

//#region Import
import appPaths from "@/core/constants/app-paths"
import PrivateLayout from "@/core/layouts/private-layout/private-layout"
import CampaignsRoute from "@/features/campaigns/routes/campaigns-route"
import SmsSendersManagementRoutes from "@/features/channels/sms-senders-management/routes/sms-senders-management.routes"
import SmsSendersRoutes from "@/features/channels/sms-senders/routes/sms-senders.routes"
// TODO: LAZY LOAD ALL BELOW
import IndustriesRoutes from "@/features/industries/routes/industries.routes"
import ContactsRoutes from "@/features/people/contacts/routes/contacts.routes"
import ExportsRoutes from "@/features/people/exports/routes/exports.routes"
import GroupsRoutes from "@/features/people/groups/routes/groups.routes"
import SegmentsRoutes from "@/features/people/segments/routes/segments.routes"
import SmsTemplatesRoutes from "@/features/templates/sms-templates/routes/sms-templates.routes"
import { lazy } from "react"
import { RouteObject } from "react-router-dom"

// eslint-disable-next-line react-refresh/only-export-components
const DisplayError = lazy(() => import("@/ui/errors/display-error"))
//#endregion

/**
 * @description A List of Private-Only Route Objects (routes)  accessible only by authenticated users
 */
const privateRoutes: RouteObject[] = [
	{
		path: "/",
		element: <PrivateLayout />,
		children: [
			// USERS ONLY ROUTES
			{ element: <ContactsRoutes />, path: "people/contacts/*" },
			{ element: <GroupsRoutes />, path: "people/groups/*" },
			{ element: <SegmentsRoutes />, path: "people/segments/*" },
			{ element: <ExportsRoutes />, path: "people/exports/*" },
			{ element: <SmsTemplatesRoutes />, path: "templates/sms-templates/*" },
			{ element: <SmsSendersRoutes />, path: `channels/*` },

			// ADMINS ONLY ROUTES
			{ element: <IndustriesRoutes />, path: `${appPaths.INDUSTRIES}/*` },
			{ element: <SmsSendersManagementRoutes />, path: "/admin/channels/*" },

			{ element: <CampaignsRoute />, path: appPaths.HOME },

			// FALLBACK - 404 IF ROUTE DOES NOT EXIST
			{ element: <DisplayError error={{ status: 404 }} />, path: "*" },
		],
	},
]

export default privateRoutes
