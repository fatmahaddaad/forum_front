import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { registerContentQuery } from '@angular/core/src/render3';
import { RegisterComponent } from './user/register/register.component';
import { ForumComponent } from './user/forum/forum.component';
import { QuestionComponent } from './user/forum/question/question.component';

const routes: Routes = [
  { path: 'login' , component: LoginComponent}, 
  { path: 'register', component: RegisterComponent},
  { path: 'forum', component: ForumComponent},
  { path: 'question/:id', component: QuestionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
