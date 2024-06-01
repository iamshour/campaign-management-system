import { RouteObject } from "react-router-dom"

/**
 * @description A List of Public-Only Route Objects (routes)
 *              accessible only by unauthenticated users
 */
const publicRoutes: RouteObject[] = [
	{
		element: <div className='text-4xl'>Landing Page (Home Route)</div>,
		path: "/",
	},
]

export default publicRoutes
