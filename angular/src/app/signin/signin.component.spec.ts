import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { TokenstorageService } from '../tokenstorage.service';

fdescribe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let loginBtn: HTMLButtonElement;
  let debugElement: DebugElement;
  let authService:AuthService;
  let spyService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent],
      providers:[AuthService,TokenstorageService],
      imports:[ReactiveFormsModule,HttpClientModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    spyService=spyOn(authService,'attemptAuth');
    fixture.detectChanges();
   
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty',()=>{
    expect(component.form.valid).toBeFalsy();
  })
  it('fields need to be empty initially',async(()=>{
    let username=component.form.controls['userName'];
    let password=component.form.controls['password'];
    fixture.detectChanges();
    expect(username.value).toBe('');
    expect(password.value).toBe('');

  }))
  it('username field validity',()=>{
    let error={};
    let username=component.form.controls['userName'];
    expect(username.valid).toBeFalsy();
    error=username.errors||{};
    expect(error['required']).toBeTruthy();
    username.setValue('test12334')
    error = username.errors || {};
        expect(error['required']).toBeFalsy();
  })
  it('password field validity',()=>{
    let errors={};
    let password=component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    errors=password.errors||{};
    expect(errors['required']).toBeTruthy();
    password.setValue('xyz')
    errors=password.errors||{};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
    password.setValue('zxcvbnmlgh')
    errors=password.errors||{};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
  })
  it('button disabled',async(()=>{
    loginBtn = fixture.debugElement.query(By.css('#loginBtn')).nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      debugger;
      fixture.detectChanges();
      expect(loginBtn.disabled).toBe(true)
     })
  }))
  it('button enabled',async(()=>{
    loginBtn = fixture.debugElement.query(By.css('#loginBtn')).nativeElement;
    let username=component.form.controls['userName'];
    let password=component.form.controls['password'];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      username.setValue('gsdhgdhgaghh');
      password.setValue('jhsaghhsgdhhjg');
      fixture.detectChanges();
      expect(loginBtn.disabled).toBe(false)
     })
  }))
  it('should call the service',()=>{
    let form=fixture.debugElement.query(By.css('form'));
    let username=component.form.controls['userName'];
    let password=component.form.controls['password'];
    username.setValue('fdghfhgfhghj');
    password.setValue('hjdgfhjfjhgdfjgdj');
    // debugElement.query(By.css('#loginBtn')).triggerEventHandler('click',null);
    form.triggerEventHandler('submit',null);
    expect(spyService).toHaveBeenCalledTimes(1);
  })

});
