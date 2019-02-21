import { Component, OnInit } from '@angular/core';
import { NewsserviceService } from '../newsservice.service';
import { TokenstorageService } from '../tokenstorage.service';

@Component({
  selector: 'app-searchhistory',
  templateUrl: './searchhistory.component.html',
  styleUrls: ['./searchhistory.component.css']
})
export class SearchhistoryComponent implements OnInit {

  searchedWords=new Array<any>();
  constructor(private news:NewsserviceService,private token:TokenstorageService) { }

  ngOnInit() {
  }
  searchHistory(){
    if(this.token.getUsername())
    this.news.getAllSearchedWords(this.token.getUsername()).subscribe(
      data=>{
        console.log(data);
        this.searchedWords=data;
      }
    );
  }
  deleteArticle(i,search){
    this.searchedWords.splice(i,1);
    this.news.deleteByID(search.searchId).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

}
