import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import businessReducer from './slices/businessSlice';
import businessFormReducer from './slices/businessFormSlice';
import adminReducer from './slices/adminSlice';
import uiReducer from './slices/uiSlice';
import searchReducer from './slices/searchSlice';
import locationReducer from './slices/locationSlice';
import adReducer from './slices/adSlice';

export const store = configureStore({
  reducer: {
    business: businessReducer,
    businessForm: businessFormReducer,
    admin: adminReducer,
    ui: uiReducer,
    search: searchReducer,
    location: locationReducer,
    ads: adReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Add any specific action types here if needed in the future
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

