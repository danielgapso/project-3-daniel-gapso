
import { configureStore } from "@reduxjs/toolkit"; 
import { VacationReducer } from "./VacationReducer";

const reducers = { allVacations: VacationReducer };

//combine reducers.
export const vacations = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});