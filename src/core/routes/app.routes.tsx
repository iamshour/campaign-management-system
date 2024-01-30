import { useRoutes } from "react-router-dom"

import commonRoutes from "./common.routes"
import privateRoutes from "./private.routes"
import publicRoutes from "./public.routes"

const auth = {
	user: "hghg",
	token: "",
}

const AppRoutes = () => {
	// const auth = useAuth();
	const routes = auth.user ? privateRoutes : publicRoutes

	const element = useRoutes([...routes, ...commonRoutes])

	return <>{element}</>
}

export default AppRoutes
