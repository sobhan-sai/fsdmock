import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { BlacklistService } from '../blacklist.service';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent implements OnInit {
  searchedWords=new Array<any>();
  constructor(private black:BlacklistService) { }
  form=new FormGroup({
    user:new FormControl('',Validators.required)
  });
  ngOnInit() {
   
  }
  get f(){
   return this.form.get('user')
  }
  blacklist(){
    this.black.blacklist(this.f.value).subscribe(
      data=>{
        console.log(data);
        this.searchedWords=data;
      }
    );
  }
  deleteUser(i,search){
    this.searchedWords.splice(i,1);
    this.black.deleteUser(search.id).subscribe(
      data=>{
        console.log(data);
      })
  }

}
