import { Component, OnInit } from '@angular/core';
import { AppUser } from '../app-user';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logininfo } from '../logininfo';
import { TokenstorageService } from '../tokenstorage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  appUser:Logininfo;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private login:AuthService, private tokenStorage: TokenstorageService) { }

  form=new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  });
  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
 
  get username(){
    return this.form.get('userName')
  }
  get password(){
    return this.form.get('password')
  }
    onSubmit(){
    alert(JSON.stringify(this.form.value));
    this.appUser=new Logininfo(this.username.value,this.password.value);
  this.login.attemptAuth(this.appUser).subscribe(
      data => {
        console.log(data);
        if(data.accessToken){
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        alert("login succesful");
          
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      });
  }
  reloadPage() {
    window.location.reload();
  }
}
