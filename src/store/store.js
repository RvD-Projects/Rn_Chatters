import { configureStore } from '@reduxjs/toolkit'

import reducers from '../reducers/index.js'
import middlewares from '../middlewares/index.js'


// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middlewares)
})