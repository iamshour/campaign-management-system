//#region Import
import { Navigate, RouteObject } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import PrivateLayout from "@/core/layouts/private-layout/private-layout"
// TODO: LAZY LOAD ALL BELOW
import IndustriesFeatureRoutes from "@/features/industries/routes/industries.feature-routes"
import ContactsFeatureRoutes from "@/features/people/contacts/routes/contacts.feature-routes"
import ExportsFeatureRoutes from "@/features/people/exports/routes/exports.feature-routes"
import GroupsFeatureRoutes from "@/features/people/groups/routes/groups.feature-routes"
import SegmentsFeatureRoutes from "@/features/people/segments/routes/segments.feature-routes"
import SmsTemplatesFeatureRoutes from "@/features/templates/sms-templates/routes/sms-templates.feature-routes"
import { DisplayError } from "@/ui"
//#endregion

/**
 * @description A List of Private-Only Route Objects (routes)
 *              accessible only by authenticated users
 */
const privateRoutes: RouteObject[] = [
	{
		path: "/",
		element: <PrivateLayout />,
		children: [
			{ path: "people/contacts/*", element: <ContactsFeatureRoutes /> },
			{ path: "people/groups/*", element: <GroupsFeatureRoutes /> },
			{ path: "people/segments/*", element: <SegmentsFeatureRoutes /> },
			{ path: "people/exports/*", element: <ExportsFeatureRoutes /> },
			{ path: "templates/sms-templates/*", element: <SmsTemplatesFeatureRoutes /> },
			{ path: "industries/*", element: <IndustriesFeatureRoutes /> },

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
			{ path: appPaths.INDUSTRIES, element: <IndustriesFeatureRoutes /> },
			{ path: appPaths.CAMPAIGNS_MANAGER, element: <div className='text-4xl'>Campaign Manager Route</div> },
			{ path: appPaths.CHANNELS, element: <div className='text-4xl'>Channels Route</div> },
			{ path: appPaths.CHATBOT, element: <div className='text-4xl'>Chatbot Route</div> },

			{ path: "*", element: <DisplayError /> },
		],
	},
]

export default privateRoutes
