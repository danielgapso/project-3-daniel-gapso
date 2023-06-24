import Vacation from "../model/Vacations/Vacation";

export class VacationState {
  public allVacations: Vacation[] = [];
}

export enum vacationActionType {
  addVacation = "addVacation",
  deleteVacation = "deleteVacation",
  editVacation = "editVacation",
  downloadVacation = "downloadVacation",
  vacationLikes = "VacationLikes",
  vacationUnlike = "VacationUnlike",
}

//action data structure
export interface VacationAction {
  type: vacationActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
export const addVacationAction = (newVacation: Vacation): VacationAction => {
  return { type: vacationActionType.addVacation, payload: newVacation };
};

export const deleteVacationAction = (VacationCode: number): VacationAction => {
  return { type: vacationActionType.deleteVacation, payload: VacationCode };
};

export const editVacationAction = (editVacation: Vacation): VacationAction => {
  return { type: vacationActionType.editVacation, payload: editVacation, };
};

export const downloadVacationAction = (allVacations: Vacation[]): VacationAction => {
  return { type: vacationActionType.downloadVacation, payload: allVacations };
};

export const vacationLikes = (VacationCode: number): VacationAction => {
  return { type: vacationActionType.vacationLikes, payload: VacationCode };
};

export const vacationUnlike = (VacationCode: number): VacationAction => {
  return { type: vacationActionType.vacationUnlike, payload: VacationCode };
};
const sortVacations = (vacations: Vacation[]): Vacation[] => {
  return vacations.sort((a, b) => {
    const startDateA = new Date(a.StartDate);
    const startDateB = new Date(b.StartDate);
    return startDateA.getTime() - startDateB.getTime();
  });
};

//the reducers 
export function VacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };
  switch (action.type) {

    //add vacation
    case vacationActionType.addVacation:
      const newVacations = sortVacations([
        ...newState.allVacations = [...newState.allVacations, action.payload]
      ]);
      return {
        ...currentState,
        allVacations: newVacations,
      };

    //download the vacation details
    case vacationActionType.deleteVacation:
      newState.allVacations = [...newState.allVacations].filter(item => item.VacationCode !== action.payload)
      break;

    //edit the vacation
    case vacationActionType.editVacation:
      newState.allVacations = [...newState.allVacations].filter(
        (item) => item.VacationCode !== action.payload
      );
      newState.allVacations = [...newState.allVacations, action.payload];
      break;

    //download the vacation
    case vacationActionType.downloadVacation:
      newState.allVacations = action.payload;
      break;

    //get the likes to the vacation
    case vacationActionType.vacationLikes:
      const vacationId = action.payload;
      const updatedVacations = currentState.allVacations.map((vacation) => {
        if (vacation.VacationCode === vacationId) {
          const updatedLikes = (vacation.likes || 0) + 1;
          return {
            ...vacation,
            likes: updatedLikes,
          };
        }
        return vacation;
      });
      return {
        ...currentState,
        allVacations: updatedVacations,
      };

    //update unlike to the vacation
    case vacationActionType.vacationUnlike:
      const unlikedVacationId = action.payload;
      const unlikedVacations = currentState.allVacations.map((vacation) => {
        if (vacation.VacationCode === unlikedVacationId) {
          const updatedLikes = (vacation.likes || 0) - 1;
          return {
            ...vacation,
            likes: updatedLikes,
          };
        }
        return vacation;
      });
      return {
        ...currentState,
        allVacations: unlikedVacations,
      };
    default:
      return currentState;
  }

  return newState;
}