import { configureStore } from "@reduxjs/toolkit"; 
import { VacationReducer } from "./VacationReducer";
import { usersReducer } from "./userReducer";

const reducers = { allVacations: VacationReducer , allUsers: usersReducer};


//combine reducers.
export const vacations = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});