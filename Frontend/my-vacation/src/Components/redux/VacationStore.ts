import { configureStore } from "@reduxjs/toolkit";
import { VacationReducer } from "./VacationReducer";
import { usersReducer } from "./userReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";



const persistConfig = {
  key: "main-root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, usersReducer);

const reducers = { allVacations: VacationReducer, allUsers: persistedUserReducer };

//combine reducers.
export const vacations = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});

export const persistor = persistStore(vacations);