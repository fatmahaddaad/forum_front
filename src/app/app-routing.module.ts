import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { registerContentQuery } from '@angular/core/src/render3';
import { RegisterComponent } from './user/register/register.component';
import { ForumComponent } from './user/forum/forum.component';
import { QuestionComponent } from './user/forum/question/question.component';
import { AskComponent } from './user/forum/ask/ask.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './user/forum/questions/questions.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CategoryComponent } from './user/forum/category/category.component';

const routes: Routes = [
  { path: '' , component: HomeComponent}, 
  { path: 'forum', component: ForumComponent,
    children: [
      { path: 'question/:id', component: QuestionComponent, canActivate: [AuthGuard]},
      { path: 'ask-question', component: AskComponent, canActivate: [AuthGuard]},
      { path: 'questions', component: QuestionsComponent},
      { path: 'category/:id', component: CategoryComponent},
    ]
  },
  { path: 'user', component: UserComponent,
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: 'login' , component: LoginComponent}, 
      { path: 'register', component: RegisterComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
