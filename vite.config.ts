//#region Import
import react from "@vitejs/plugin-react"
import { FontaineTransform } from "fontaine"
import { visualizer } from "rollup-plugin-visualizer"
import Unfonts from "unplugin-fonts/vite"
import Icons from "unplugin-icons/vite"
import { splitVendorChunkPlugin, defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

//#endregion

const baseConfigs = defineConfig({
	publicDir: "public",
	build: {
		outDir: "dist",
		rollupOptions: {
			// output: {
			// 	manualChunks: { dependencies: ["react", "react-dom"] },
			// },
			output: {
				manualChunks(id: string) {
					// creating a chunk to react routes deps. Reducing the vendor chunk size
					if (id.includes("react-router-dom") || id.includes("react-router")) return "@react-router"
				},
			},
			treeshake: true,
		},

		chunkSizeWarningLimit: 2000,
		minify: true,
		sourcemap: false,
		commonjsOptions: { ignore: ["bufferutil", "utf-8-validate"] },
	},
	optimizeDeps: { include: ["react", "react-dom"] },
	base: "/",
	plugins: [
		react(),
		splitVendorChunkPlugin(),
		tsconfigPaths({ ignoreConfigErrors: true }),
		visualizer({ open: true, filename: "chunks-report.html" }),
		FontaineTransform.vite({ fallbacks: ["BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans"] }),
		Unfonts({
			google: {
				families: [
					{
						name: "Roboto",
						styles: "wght@300;400;500;700;900",
						defer: true,
					},
				],
			},
		}),
		Icons({ compiler: "jsx", jsx: "react" }),
		svgr(),
	],
	server: { port: 3000, host: true },
	preview: { port: 3000 },
})

export default baseConfigs
