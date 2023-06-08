class User {
    public UserFirstName: string;
    public UserPassword: string;
    public UserLastName: string;
    public UserEmail: string;
    public UserCode: string;

    constructor(UserFirstName: string, UserPassword: string, 
        UserLastName: string , UserEmail: string, UserCode: string ) {

        this.UserFirstName = UserFirstName;
        this.UserPassword = UserPassword;
        this.UserLastName = UserLastName;
        this.UserEmail = UserEmail;
        this.UserCode = UserCode;
    }
    
}

export default User;