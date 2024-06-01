import { RouteObject } from "react-router-dom"

/**
 * @description A List of Common Route Objects (routes)
 *              accessible by both authenticated & unauthenticated users
 */
const commonRoutes: RouteObject[] = [
	{
		element: <div className='text-4xl'>Privacy Policy Page</div>,
		path: "/privacy-policy",
	},
]

export default commonRoutes
