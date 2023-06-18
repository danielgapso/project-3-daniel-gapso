import { vacations } from "../redux/VacationStore";

export const userLoggedIn = () => {
  return vacations.getState().allUsers.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  if (loggedIn) {
    const user = vacations.getState().allUsers.users[0];
    return user.isAdmin;
  } else {
    return false;
  }
}