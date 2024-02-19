//#region Import
import { lazy } from "react"
import { Navigate, RouteObject } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import PrivateLayout from "@/core/layouts/private-layout/private-layout"
// TODO: LAZY LOAD ALL BELOW
import IndustriesRoutes from "@/features/industries/routes/industries.routes"
import ContactsRoutes from "@/features/people/contacts/routes/contacts.routes"
import ExportsRoutes from "@/features/people/exports/routes/exports.routes"
import GroupsRoutes from "@/features/people/groups/routes/groups.routes"
import SegmentsRoutes from "@/features/people/segments/routes/segments.routes"
import SmsTemplatesRoutes from "@/features/templates/sms-templates/routes/sms-templates.routes"

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
			{ path: "people/contacts/*", element: <ContactsRoutes /> },
			{ path: "people/groups/*", element: <GroupsRoutes /> },
			{ path: "people/segments/*", element: <SegmentsRoutes /> },
			{ path: "people/exports/*", element: <ExportsRoutes /> },
			{ path: "templates/sms-templates/*", element: <SmsTemplatesRoutes /> },
			{ path: "industries/*", element: <IndustriesRoutes /> },

			{ path: "/", element: <Navigate to={appPaths.DASHBOARD} /> },
			{
				path: appPaths.DASHBOARD,
				element: <div className='text-4xl'>Dashboard Route</div>,
			},
			{
				path: appPaths.INBOX,
				element: <div className='text-4xl'>Inbox Route</div>,
			},
			{ path: appPaths.INTEGRATIONS, element: <div className='text-4xl'>Integrations Route</div> },
			{ path: appPaths.CAMPAIGNS_MANAGER, element: <div className='text-4xl'>Campaign Manager Route</div> },
			{ path: appPaths.CHANNELS, element: <div className='text-4xl'>Channels Route</div> },
			{ path: appPaths.CHATBOT, element: <div className='text-4xl'>Chatbot Route</div> },

			{ path: "*", element: <DisplayError /> },
		],
	},
]

export default privateRoutes
