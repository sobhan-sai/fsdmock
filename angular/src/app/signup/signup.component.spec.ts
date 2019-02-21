import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../auth.service';
import { TokenstorageService } from '../tokenstorage.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { LandingComponent } from '../landing/landing.component';
import { SearcharticleComponent } from '../searcharticle/searcharticle.component';
import { SearchhistoryComponent } from '../searchhistory/searchhistory.component';
import { BlacklistComponent } from '../blacklist/blacklist.component';
import { By } from '@angular/platform-browser';

fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signBtn:HTMLButtonElement;
  let debugElement:DebugElement;
  let authService:AuthService;
  let spyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent,SigninComponent ,AppComponent,
        HomeComponent,
        LandingComponent,
        SearcharticleComponent,
        SearchhistoryComponent,
        BlacklistComponent, ],
      providers:[AuthService,TokenstorageService],
      imports:[ReactiveFormsModule,HttpClientModule,AppRoutingModule,RouterTestingModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    debugElement=fixture.debugElement;
    authService=debugElement.injector.get(AuthService);
    spyService=spyOn(authService,'signUp');
    let signbtn:HTMLButtonElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty',()=>{
    expect(component.form.valid).toBeFalsy();
  })
  it('fields need to be empty initially',async(()=>{
    let name=component.form.controls['firstName'];
    let username=component.form.controls['userName'];
    let email=component.form.controls['email'];
    let password=component.form.controls['password'];
    fixture.detectChanges();
    expect(name.value).toBe('');
    expect(username.value).toBe('');
    expect(email.value).toBe('');
    expect(password.value).toBe('');
  }))
  it('name field validity',()=>{
    let error={}
    let name=component.form.controls['firstName'];
    expect(name.valid).toBeFalsy();
    error=name.errors||{};
    expect(error['required']).toBeTruthy();
    name.setValue('testtest')
    error=name.errors||{};
    expect(error['required']).toBeFalsy();
  })
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
  it('email field validity',()=>{
let errors={};
let email=component.form.controls['email'];
expect(email.valid).toBeFalsy();
errors=email.errors||{};
expect(errors['required']).toBeTruthy();
// expect(errors['email']).toBeTruthy();
email.setValue('xyz')
errors=email.errors||{};
expect(errors['required']).toBeFalsy();
email.setValue('xyz@gmail.com')
errors=email.errors||{};
expect(errors['required']).toBeFalsy();
// expect(errors['email']).toBeFalsy();
  })
  it('button disabled',async(()=>{
    signBtn = fixture.debugElement.query(By.css('#signBtn')).nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      debugger;
      fixture.detectChanges();
      expect(signBtn.disabled).toBe(true)
     })
  }))
  it('button enabled',async(()=>{
    signBtn = fixture.debugElement.query(By.css('#signBtn')).nativeElement;
    let name=component.form.controls['firstName'];
    let username=component.form.controls['userName'];
    let email=component.form.controls['email'];
    let password=component.form.controls['password'];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      name.setValue('hgsdghhghfgshf');
      username.setValue('gsdhgdhgaghh');
      password.setValue('jhsaghhsgdhhjg');
      email.setValue('jdhgjdgjhg@gmail.com');
      fixture.detectChanges();
      expect(signBtn.disabled).toBe(false)
     })
  }))
  it('should call the service',()=>{
    let form=fixture.debugElement.query(By.css('form'));
    let name=component.form.controls['firstName'];
    let username=component.form.controls['userName'];
    let email=component.form.controls['email'];
    let password=component.form.controls['password'];
    name.setValue('hgsdghhghfgshf');
      username.setValue('gsdhgdhgaghh');
      password.setValue('jhsaghhsgdhhjg');
      email.setValue('jdhgjdgjhg@gmail.com');
     // debugElement.query(By.css('#signBtn')).triggerEventHandler('click',null);
      form.triggerEventHandler('submit',null);
      fixture.detectChanges();
      expect(spyService).toHaveBeenCalled();
  })  
});
