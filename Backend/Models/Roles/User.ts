class User {
    private UserFirstName: string;
    private UserPassword: string;
    private UserLastName: string;
    private UserEmail: string;
    private UserCode: string;

    constructor(UserFirstName: string, UserPassword: string, UserLastName: string , UserEmail: string, UserCode: string ) {
        this.UserFirstName = UserFirstName;
        this.UserPassword = UserPassword;
        this.UserLastName = UserLastName;
        this.UserEmail = UserEmail;
        this.UserCode = UserCode;
    }
    
    public GetUserFirstName() {
      return this.UserFirstName;
    }
    public GetUserLastName() {
      return this.UserLastName;
    }
    public GetUserPassword() {
       return this.UserPassword;
    }
    public GetUserEmail() {
       return this.UserEmail;
    }
    public GetUserCode() {
       return this.UserCode;
    }
}

export default User;