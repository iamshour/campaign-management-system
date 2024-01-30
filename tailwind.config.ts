import sharedConfig from "@config/tailwind"
import type { Config } from "tailwindcss"

const config: Partial<Config> = {
	presets: [sharedConfig],
}

export default config
