import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {
  private searchWordUrl='http://localhost:4256/api/user/searchedWord'
  private historyUrl='http://localhost:4256/api/user/getAllSearchedWords/'
  private deleteWordUrl='http://localhost:4256/api/user/deleteSearchedWords/'
  constructor(private http:HttpClient) { }
  addSearchWord(data){
    return this.http.post<string>(this.searchWordUrl,data);
  }

  getAllSearchedWords(userName:string){
    return this.http.get<[]>(this.historyUrl+userName);
  }
  deleteByID(searchId:number){
    console.log(searchId);
    return this.http.delete(this.deleteWordUrl+searchId);

  }
}
