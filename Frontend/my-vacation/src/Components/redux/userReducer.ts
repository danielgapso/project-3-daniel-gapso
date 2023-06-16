import User from "../model/Roles/User"

export class UserState {
    public users: User[] = [];
    public isLoggedIn: boolean = false;
}

export enum UserActionType {
    addUser = "addUser",
    downloadUsers = "downloadUsers",
    isLoggedIn = "isLoggedIn",
    Liked = "Liked",
}

export interface UserAction {
    type: UserActionType;
    payload?: any;
}

//which function will run when i will dispatch an action
export const addUserAction = (newUser: User): UserAction => {
    return { type: UserActionType.addUser, payload: newUser };
};

export const downloadUsersAction = (users: User[]): UserAction => {
    return { type: UserActionType.downloadUsers, payload: users };
};

export const isLoggedInAction = (isLoggedIn: boolean): UserAction => {
    return { type: UserActionType.isLoggedIn, payload: isLoggedIn };
};

export const changeLikesAction = (Likes: number[]): UserAction => {
    return { type: UserActionType.Liked, payload: Likes };
};

export function usersReducer(
    currentState: UserState = new UserState(),
    action: UserAction
): UserState {
    const newState = { ...currentState };

    switch (action.type) {
        case UserActionType.addUser:
            newState.users = [...newState.users, action.payload]
            break;
        case UserActionType.downloadUsers:
            newState.users = action.payload;
            break;
        case UserActionType.isLoggedIn:
            newState.isLoggedIn = action.payload;
            if (!action.payload) {
                newState.users = [];
            }
            break;
        
    }
    return newState;
};