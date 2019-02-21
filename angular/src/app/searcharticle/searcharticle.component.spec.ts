import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcharticleComponent } from './searcharticle.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { NewsserviceService } from '../newsservice.service';
import { TokenstorageService } from '../tokenstorage.service';
import { By } from '@angular/platform-browser';

fdescribe('SearcharticleComponent', () => {
  let component: SearcharticleComponent;
  let fixture: ComponentFixture<SearcharticleComponent>;
  let searchBtn:HTMLButtonElement;
  let debugElement:DebugElement;
  let spyService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearcharticleComponent],
      providers:[NewsserviceService,TokenstorageService],
      imports:[ReactiveFormsModule,HttpClientModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcharticleComponent);
    component = fixture.componentInstance;
    debugElement=fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty',()=>{
    expect(component.form.valid).toBeFalsy();
  })
  it('fields need to be empty initially',async(()=>{
    let search=component.form.controls['query'];
    fixture.detectChanges();
    expect(search.value).toBe('');
  }))
  it('serach field validity',()=>{
    let error={};
    let search=component.form.controls['query'];
    expect(search.valid).toBeFalsy();
    error=search.errors||{};
    expect(error['required']).toBeTruthy();
    //expect(error['minlength']).toBeTruthy();
    search.setValue('test12334')
    error = search.errors || {};
        expect(error['required']).toBeFalsy();
       // expect(error['minlength']).toBeFalsy();
  })
  it('button disabled',async(()=>{
    searchBtn = fixture.debugElement.query(By.css('#searchBtn')).nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      debugger;
      fixture.detectChanges();
      expect(searchBtn.disabled).toBe(true)
     })
  }))
  it('button enabled',async(()=>{
    searchBtn = fixture.debugElement.query(By.css('#searchBtn')).nativeElement;
    let search=component.form.controls['query'];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      search.setValue('gsdhgdhgaghh');
      fixture.detectChanges();
      expect(searchBtn.disabled).toBe(false)
     })
  }))
  
});
