/**
 * Custom function to lazy load modules with delay.
 * Mainly used to test skeleton behvior for Fallbcack prop in <Suspense /> component that wraps lazy laoded elements
 *
 * @param cb CAllback function used to import modules lazily
 * @param delay Number of millisceonds to delay. @default 5000
 *
 * @example const MyComponent = lazy(() => delayLazyImport(import("./view-contact-dialog-content"), 6000))
 */
const lazyImport = async (cb: any, delay?: number): Promise<any> => {
	return new Promise((resolve) => {
		return setTimeout(() => {
			resolve(cb)
		}, delay || 5000)
	})
}

export default lazyImport
