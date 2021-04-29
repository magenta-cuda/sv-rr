import { configureStore } from '@reduxjs/toolkit'
import choosersReducer from '../features/chooser/choosersSlice'

export default configureStore({
  reducer: {
    choosers: choosersReducer,
  },
})
