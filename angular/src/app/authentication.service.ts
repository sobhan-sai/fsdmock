import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenstorageService } from './tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private jwtHelper:JwtHelperService,private tokenStore:TokenstorageService) { }
  public isAuthenticated(): boolean {
    const token = this.tokenStore.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
