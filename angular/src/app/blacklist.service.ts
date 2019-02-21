import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private http:HttpClient,private user:AuthService) { }
  private blacklistUrl='http://localhost:4256/api/user/blacklist/'
  blacklist(data){
    console.log(data);
    return this.http.get<[]>(this.blacklistUrl+data);
  }
  deleteUser(id:number){
    return this.http.patch(this.blacklistUrl+id,null);
   
  }
}
