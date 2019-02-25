import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: Http) { }
  Url = 'http://127.0.0.1:8000/';

  createUser(user) {
    const formData: FormData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    return this.http.post(this.Url+"register", formData);
  }
}
