import { vacations } from "../redux/VacationStore";

//get the state if the user is logged in 
export const userLoggedIn = () => {
  return vacations.getState().allUsers.isLoggedIn;
};

//get the state if the user is admin or not 
export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  if (loggedIn) {
    const user = vacations.getState().allUsers.users[0];
    return user.isAdmin;
  } else {
    return false;
  }
}