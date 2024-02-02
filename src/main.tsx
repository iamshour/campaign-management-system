import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"

import "./index.css"

import "../node_modules/@blueai/ui/src/styles.css"
import "@/core/lib/i18n"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
