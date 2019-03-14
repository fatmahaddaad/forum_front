import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NotifierModule } from 'angular-notifier';
import { JwtModule } from '@auth0/angular-jwt';
import {NgxPaginationModule} from 'ngx-pagination';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ForumComponent } from './user/forum/forum.component';
import { QuestionComponent } from './user/forum/question/question.component';
import { AskComponent } from './user/forum/ask/ask.component';
import { filterTopics, sortTopics } from './services/filterTopics.pipe';
import { QuestionsComponent } from './user/forum/questions/questions.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CategoryComponent } from './user/forum/category/category.component';
import { UsersComponent } from './user/users/users.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CategoriesComponent } from './user/forum/categories/categories.component';
import { ForbiddenComponent } from './user/forum/forbidden/forbidden.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForumComponent,
    filterTopics,
    sortTopics,
    QuestionComponent,
    AskComponent,
    QuestionsComponent,
    ProfileComponent,
    CategoryComponent,
    UsersComponent,
    UserProfileComponent,
    CategoriesComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NotifierModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: []
      }
    }),
    NgxPaginationModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
