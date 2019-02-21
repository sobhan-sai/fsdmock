import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import{ReactiveFormsModule} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { httpInterceptorProviders } from './auth-interceptor.service';
import { SearcharticleComponent } from './searcharticle/searcharticle.component';
import { SearchhistoryComponent } from './searchhistory/searchhistory.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { JwtModuleOptions, JwtModule, JwtHelperService } from '@auth0/angular-jwt';
export function tokenGetter() {
  return window.sessionStorage.getItem('TOKEN_KEY');
}


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    LandingComponent,
    SearcharticleComponent,
    SearchhistoryComponent,
    BlacklistComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({config:{
      tokenGetter: tokenGetter
    }})
  ],
  providers: [httpInterceptorProviders,JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
