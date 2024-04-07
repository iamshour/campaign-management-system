//#region Import
import reduxStore from "@/core/lib/redux-toolkit/store"
import AppRoutes from "@/core/routes/app.routes"
import { DirectionProvider, ErrorBoundary, Spinner } from "@/ui"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
//#endregion

const App = () => {
	const { i18n } = useTranslation()

	const languagesReadDirection = i18n.dir()

	document.dir = languagesReadDirection

	return (
		<Suspense fallback={<AppLoader />}>
			<ErrorBoundary className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
				<I18nextProvider i18n={i18n}>
					<DirectionProvider dir={languagesReadDirection}>
						<ReduxProvider store={reduxStore.store}>
							<PersistGate loading={<AppLoader />} persistor={reduxStore.persistor}>
								<Router>
									<Toaster
										position={languagesReadDirection === "ltr" ? "top-right" : "top-left"}
										toastOptions={{ duration: 4000 }}
									/>
									<AppRoutes />
								</Router>
							</PersistGate>
						</ReduxProvider>
					</DirectionProvider>
				</I18nextProvider>
			</ErrorBoundary>
		</Suspense>
	)
}

const AppLoader = () => (
	<div className='flex h-screen w-screen items-center justify-center'>
		<Spinner size='xl' />
	</div>
)

export default App
