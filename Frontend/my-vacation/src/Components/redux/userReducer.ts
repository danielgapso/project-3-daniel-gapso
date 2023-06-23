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

//action data structure
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

//the reducers 
export function usersReducer(
  currentState: UserState = new UserState(),
  action: UserAction
): UserState {
  const newState = { ...currentState };
  switch (action.type) {

    //add the user
    case UserActionType.addUser:
      newState.users = [...newState.users, action.payload];
      break;

    //download the user details
    case UserActionType.downloadUsers:
      const user = action.payload[0];
      const likedVacationsString = user.likedVacations || '[]';
      const likedVacations = JSON.parse(likedVacationsString) as number[];
      const userWithLikedVacations = { ...user, likedVacations };
      return {
        ...currentState,
        users: [userWithLikedVacations],
      };
    //checks if the user logged in
    case UserActionType.isLoggedIn:
      newState.isLoggedIn = action.payload;
      if (!action.payload) {
        newState.users = [];
      }
      break;

    //shows liked vacations by the logged user
    case UserActionType.Liked:
      const updatedUser = { ...newState.users[0] };
      const likedVacationId = action.payload[0] || 0;
      const updatedLikedVacations = [...updatedUser.likedVacations];

      if (updatedLikedVacations.includes(likedVacationId)) {

        // Remove the vacation code if it already exists
        updatedLikedVacations.splice(
          updatedLikedVacations.indexOf(likedVacationId),
          1
        );
      } else {

        // Add the vacation code if it doesnt exist
        updatedLikedVacations.push(likedVacationId);
      }
      updatedUser.likedVacations = updatedLikedVacations;
      newState.users = [updatedUser];
      return { ...newState };
  }
  return newState;
}

