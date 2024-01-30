import { RouteObject } from "react-router-dom"

/**
 * @description A List of Common Route Objects (routes)
 *              accessible by both authenticated & unauthenticated users
 */
const commonRoutes: RouteObject[] = [
	{
		path: "/privacy-policy",
		element: <div className='text-4xl'>Privacy Policy Page</div>,
	},
]

export default commonRoutes
