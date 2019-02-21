export class AppUser {
   name:string;
   userName:string;
   userEmail:string;
   password:string;
   roles:number;
   
   constructor(name:string,userName:string,userEmail:string,password:string){
       this.name=name;
       this.userName=userName;
       this.userEmail=userEmail;
       this.password=password;
       this.roles=1;

   }

}
