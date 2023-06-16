class User {
   public UserFirstName: string;
   public UserPassword: string;
   public UserLastName: string;
   public UserEmail: string;
   public UserCode: string;
   public isAdmin: boolean;

   constructor(UserFirstName: string, UserPassword: string, 
       UserLastName: string , UserEmail: string, UserCode: string ,isAdmin: boolean) {

       this.UserFirstName = UserFirstName;
       this.UserPassword = UserPassword;
       this.UserLastName = UserLastName;
       this.UserEmail = UserEmail;
       this.UserCode = UserCode;
       this.isAdmin = isAdmin;
   }
   
}

export default User;