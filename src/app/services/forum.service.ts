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
  getTopics() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+"topics", {headers});
  }
  getRepliesCount(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`countReplies/${id}`, {headers});
  }
  getTopic(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`topic/${id}`, {headers});
  }
  getRepliesByTopic(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`repliesByTopic/${id}`, {headers});
  }
  getCommentsByReply(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`commentsByReply/${id}`, {headers});
  }
  getCategories() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`categories`, {headers});
  }
  addTopic(topic) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('subject', topic.subject);
    formData.append('content', topic.content);
    formData.append('category_id', topic.category_id);
    return this.http.post(this.Url+"addTopic", formData, {headers});
  }
  addReply(reply) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('content', reply.content);
    formData.append('topic_id', reply.topic_id);
    return this.http.post(this.Url+"addReply", formData, {headers});
  }
  addComment(comment) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('content', comment.content);
    formData.append('reply_id', comment.reply_id);
    return this.http.post(this.Url+"addComment", formData, {headers});
  }
}
