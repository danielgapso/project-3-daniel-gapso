class User {
    public UserFirstName: string;
    public UserPassword: string;
    public UserLastName: string;
    public UserEmail: string;
    public UserCode: number;
    public isAdmin: boolean;
    public likedVacations: number[];

    constructor(UserFirstName: string, UserPassword: string, 
        UserLastName: string , UserEmail: string, UserCode: number ,isAdmin: boolean ,likedVacations: number[]) {

        this.UserFirstName = UserFirstName;
        this.UserPassword = UserPassword;
        this.UserLastName = UserLastName;
        this.UserEmail = UserEmail;
        this.UserCode = UserCode;
        this.isAdmin = isAdmin;
        this.likedVacations = likedVacations;
    }
    
}

export default User;