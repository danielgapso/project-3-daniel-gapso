class User {
    public UserFirstName: string;
    public UserPassword: string;
    public UserLastName: string;
    public UserEmail: string;
    public UserCode: number;

    constructor(UserFirstName: string, UserPassword: string, UserLastName: string , UserEmail: string, UserCode: number ) {
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