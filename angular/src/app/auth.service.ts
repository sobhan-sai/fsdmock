import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from './app-user';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { Logininfo } from './logininfo';

const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpUrl='http://localhost:4256/api/auth/signup'
  private loginUrl='http://localhost:4256/api/auth/signin'
  constructor(private http:HttpClient) { }
  attemptAuth(credentials:Logininfo){
    return this.http.post<JwtResponse>(this.loginUrl,credentials,httpOptions);
  }
  signUp(info:AppUser):Observable<string>{
    return this.http.post<string>(this.signUpUrl,info,httpOptions);
  }
}
