import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import { getErrorMessage } from "./helpers"

/**
 * Error middleware for Redux store.
 * @param api - The Redux API object.
 * @returns A middleware function that handles errors in Redux actions.
 */
const errorMiddleware: Middleware =
	// api: MiddlewareAPI
	() => (next) => (action) => {
		if (isRejectedWithValue(action)) {
			console.log("RTK Rejection Error from errorMiddleware")
			toast.error(getErrorMessage(action?.payload))
		}

		return next(action)
	}

export default errorMiddleware
