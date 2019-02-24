import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { registerContentQuery } from '@angular/core/src/render3';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: 'login' , component: LoginComponent}, 
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
