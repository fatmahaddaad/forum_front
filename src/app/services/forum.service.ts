import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: Http) { }
  Url = 'http://127.0.0.1:8000/';
  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer '+localStorage.getItem('token')); 
  }
  createUser(user) {
    const formData: FormData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    return this.http.post(this.Url+"register", formData);
  }
  loginUser(user) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.Url+`login_check`, user, {headers});
  }
}
