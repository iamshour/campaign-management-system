import { useDispatch as useReduxDispatch } from "react-redux"

import type { AppDispatch } from "../lib/redux-toolkit/store"

const useDispatch: () => AppDispatch = useReduxDispatch

export default useDispatch
