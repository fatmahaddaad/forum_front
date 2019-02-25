import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { registerContentQuery } from '@angular/core/src/render3';
import { RegisterComponent } from './user/register/register.component';
import { ForumComponent } from './user/forum/forum.component';

const routes: Routes = [
  { path: 'login' , component: LoginComponent}, 
  { path: 'register', component: RegisterComponent},
  { path: 'forum', component: ForumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
