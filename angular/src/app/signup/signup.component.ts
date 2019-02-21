import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppUser } from '../app-user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  appUser:AppUser;
  errorMessage:string='';
  constructor(private signup:AuthService) { }

  form=new FormGroup({
    firstName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email  ]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  });
  
  ngOnInit() {
  }
  get firstname(){
    return this.form.get('firstName')
  }
  get username(){
    return this.form.get('userName')
  }
  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
    onSubmit(){
    alert(JSON.stringify(this.form.value));
    this.appUser=new AppUser(this.firstname.value,this.username.value,this.email.value,this.password.value);
  this.signup.signUp(this.appUser).subscribe(
    data=>{
      console.log(data);
    },
    error=>{
      console.log(error);
      this.errorMessage=error.message;
    }
  );
  }

}

