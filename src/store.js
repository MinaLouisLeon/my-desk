import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./reducers/settingsReducer";
import desktopModeReducer from "./reducers/desktopModeReducer";
import foldersReducer from "./reducers/foldersReducer";
import budgetsReducer from "./reducers/budgetsReducer";
const reducers = combineReducers({
  settingsReducer,
  desktopModeReducer,
  foldersReducer,
  budgetsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "settingsReducer",
    "desktopModeReducer",
    "foldersReducer",
    "budgetsReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk : {},
  //     // serializableCheck: {
  //     //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     // },
  //   }),
  devTools: true,
});
