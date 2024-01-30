//#region Import
import NotFoundError from "@package/ui/src/errors/notfound-error"
import { Navigate, RouteObject } from "react-router-dom"

import appPaths from "@/core/constants/app-paths"
import PrivateLayout from "@/core/layouts/private-layout/private-layout"
import ContactsFeatureRoutes from "@/features/people/contacts/routes"
import ExportsFeatureRoutes from "@/features/people/exports/routes"
import GroupsFeatureRoutes from "@/features/people/groups/routes"
import SegmentsFeatureRoutes from "@/features/people/segments/routes"
import SmsTemplatesFeatureRoutes from "@/features/templates/sms-templates/routes"
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
			{ path: appPaths.TEMPLATE_MANAGER, element: <div className='text-4xl'>Template Manager Route</div> },
			{ path: appPaths.CHANNELS, element: <div className='text-4xl'>Channels Route</div> },
			{ path: appPaths.CHATBOT, element: <div className='text-4xl'>Chatbot Route</div> },

			{ path: "*", element: <NotFoundError /> },
		],
	},
]

export default privateRoutes
