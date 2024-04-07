// import "../node_modules/@/ui/src/styles.css"
import "@/core/lib/i18n"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
