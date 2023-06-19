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
        case UserActionType.Liked:
            const updatedUser = { ...newState.users[0] };
            const likedVacationId = action.payload[0] || 0;
            const updatedLikedVacations = [...updatedUser.likedVacations];

            if (updatedLikedVacations.includes(likedVacationId)) {
                // Remove the vacation ID if it already exists
                updatedLikedVacations.splice(
                    updatedLikedVacations.indexOf(likedVacationId),
                    1
                );
            } else {
                // Add the vacation ID if it doesn't exist
                updatedLikedVacations.push(likedVacationId);
            }

            updatedUser.likedVacations = updatedLikedVacations;
            newState.users = [updatedUser];
            return { ...newState };

    }
    return newState;
};