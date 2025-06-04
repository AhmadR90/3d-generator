

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice/UserSlice'; // Adjust the import path
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Persist config
const persistConfig = {
  key: 'root', // Key for the persisted state in localStorage
  storage, // Use localStorage
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Create the store
export const store = configureStore({
  reducer: {
    user: persistedReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      },
    }),
});

// Create a persistor to use with PersistGate
export const persistor = persistStore(store);