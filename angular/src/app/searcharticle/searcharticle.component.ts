import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '../article';
import { Router } from '@angular/router';
import { NewsserviceService } from '../newsservice.service';
import { TokenstorageService } from '../tokenstorage.service';

declare var require: any;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4650fc8bb50b4d22ad3b1b47bc51f83e');

@Component({
  selector: 'app-searcharticle',
  templateUrl: './searcharticle.component.html',
  styleUrls: ['./searcharticle.component.css']
})
export class SearcharticleComponent implements OnInit {
  size = 1;
  articles = Array<Article>();
  form: FormGroup;
  isLoading: boolean;
  ispresent:boolean
  constructor(private router: Router, private newsService: NewsserviceService, private fb: FormBuilder,private token:TokenstorageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(2)]]
    });

  }
  getArticles() {
    newsapi.v2.everything({
      q: this.form.value.query,
      sources: 'bbc-news,the-verge,google-news-in,the-times-of-india,the-hindu,news24',
      pageSize: '8',
      page: this.size
    }).then(response => {
      this.isLoading = false;
      console.log(response);
      this.articles = response['articles'];
      if(this.articles.length>0){
          this.addSearchWord();
      }
      else{
        this.ispresent=true;
      }
      
    });
  }
  loadMore() {
   
    this.isLoading = true;
    this.size = this.size + 1;
    this.getArticles();
    
  }
  showLess() {
    
    this.isLoading = true;
    if (this.size > 1) {
      this.size--;
      this.getArticles();
    }

  }
  search() {
    this.isLoading = true;
    console.log(this.form.value.query);
    this.getArticles();
  }
addSearchWord(){
  let json={
    searchedWord:this.form.value.query,
    userName:this.token.getUsername()
  };
  this.newsService.addSearchWord(json).subscribe(
    data=>{
      console.log(data);
    }
  )
}

}
