import Vacation from "../model/Vacations/Vacation";


export class VacationState {
    public allVacations: Vacation[] = [];
}


export enum vacationActionType {
    addVacation = "addVacation",
    deleteVacation = "deleteVacation",
    editVacation = "editVacation",
    downloadVacation = "downloaVacation"
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

export function VacationReducer(
    currentState: VacationState = new VacationState(),
    action: VacationAction
): VacationState {
    const newState = { ...currentState };

    switch (action.type) {
        case vacationActionType.addVacation:
            newState.allVacations = [...newState.allVacations, action.payload]
            break;
        case vacationActionType.deleteVacation:
            newState.allVacations = [...newState.allVacations].filter(item => item.VacationCode !== action.payload)
            break;
        case vacationActionType.editVacation:
            newState.allVacations = [...newState.allVacations].filter(
                (item) => item.VacationCode !== action.payload
            );
            newState.allVacations = [...newState.allVacations, action.payload];
            break;
        case vacationActionType.downloadVacation:
            newState.allVacations = action.payload;
            break;
    }
    return newState;
};