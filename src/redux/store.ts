import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './slices/businessSlice';
import businessFormReducer from './slices/businessFormSlice';
import adminReducer from './slices/adminSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    business: businessReducer,
    businessForm: businessFormReducer,
    admin: adminReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Useful for complex objects if needed, but we should stay serializable
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
