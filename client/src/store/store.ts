import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage for web
import managerReducer from '../features/managerSlice';
import employeeReducer from '../features/employeeSlice'
import teamleadReducer from '../features/teamleadSlice'
import { combineReducers } from 'redux';

// Create a persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage,     // Storage engine (localStorage in this case)
};

// Combine reducers
const rootReducer = combineReducers({
  manager: managerReducer, 
  teamlead : teamleadReducer,
  employee : employeeReducer
});

// Wrap your combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with serializableCheck turned off
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific paths that might cause non-serializable errors
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Create a persistor for managing persisted state
export const persistor = persistStore(store);

// Export the type of the dispatch function
export type AppDispatch = typeof store.dispatch;

// Export the type of your store for use in useSelector
export type RootState = ReturnType<typeof store.getState>; // This should reflect the state structure
