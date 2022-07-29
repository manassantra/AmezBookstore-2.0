import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { SignupComponent } from './account/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvailableComponent } from './sellers/available/available.component';
import { AuthGurdService } from './service/auth-gurd.service';

const routes: Routes = [
  {
    path : 'account/login', component : LoginComponent
  },
  {
    path : 'account/signup', component : SignupComponent , canActivate: [AuthGurdService]
  },
  {
    path : '', component : DashboardComponent, canActivate: [AuthGurdService]
  },
  {
    path : 'dashboard', component : DashboardComponent, canActivate: [AuthGurdService]
  },
  {
    path : 'sellers/available', component : AvailableComponent , canActivate: [AuthGurdService]
  },
  {
    path : 'profile', component : ProfileComponent, canActivate: [AuthGurdService]
  },
  {
    path: '**', component: DashboardComponent, canActivate: [AuthGurdService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
