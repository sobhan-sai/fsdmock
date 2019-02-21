import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SearcharticleComponent } from './searcharticle/searcharticle.component';
import { SearchhistoryComponent } from './searchhistory/searchhistory.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { AuthGaurdGuard as AuthGuard } from './auth-gaurd.guard';

const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'searcharticle',
    component:SearcharticleComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'searchhistory',
    component:SearchhistoryComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'blacklist',
    component:BlacklistComponent,
    canActivate: [AuthGuard] 
  },
  {
    path:'',
    component:LandingComponent

  },
  {
    path:'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
