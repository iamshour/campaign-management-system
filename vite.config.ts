//#region Import
import baseConfig from "@config/vite"
import Icons from "unplugin-icons/vite"
import svgr from "vite-plugin-svgr"
//#endregion

export default baseConfig({
	server: { port: 3000, host: true },
	preview: { port: 3000 },
	plugins: [Icons({ compiler: "jsx", jsx: "react" }), svgr()],
})
