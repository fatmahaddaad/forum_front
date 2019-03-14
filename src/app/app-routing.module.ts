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
import { UsersComponent } from './user/users/users.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CategoriesComponent } from './user/forum/categories/categories.component';

const routes: Routes = [
  { path: '' , component: HomeComponent}, 
  { path: 'forum', component: ForumComponent,
    children: [
      { path: 'question/:id', component: QuestionComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']} },
      { path: 'ask-question', component: AskComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']} },
      { path: 'questions', component: QuestionsComponent},
      { path: 'category/:id', component: CategoryComponent},
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ROLE_MODERATOR', 'ROLE_ADMIN']} },
    ]
  },
  { path: 'user', component: UserComponent,
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']} },
      { path: 'login' , component: LoginComponent}, 
      { path: 'register', component: RegisterComponent},
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ROLE_MODERATOR', 'ROLE_ADMIN']} },
      { path: 'user/:id/:username', component: UserProfileComponent, canActivate: [AuthGuard], data: { allowedRoles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
