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
  getcountVotes(reply_id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`countVotes/${reply_id}`, {headers});
  }
  getCurrentUser() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`api`, {headers});
  }
  getprofile(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`profileShow/${id}`, {headers});
  }
  editProfile(user, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`editProfile/${id}`, user, {headers});
  }
  setProfilePicture(fileToUpload: File, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('picture', fileToUpload, fileToUpload.name);
    return this.http.post(this.Url+`setProfilePicture/${id}`, formData, {headers});
  }
  deleteTopic(topic) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.Url+`deleteTopic/${topic}` ,topic, {headers});
  }
  editTopic(topic, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`editTopic/${id}`, topic, {headers});
  }
  getcategory(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`topicsByCategory/${id}`, {headers});
  }
  getReply(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`reply/${id}`, {headers});
  }
  editReply(reply, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`editReply/${id}`, reply, {headers});
  }
  deleteReply(reply) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.Url+`deleteReply/${reply}` ,reply, {headers});
  }
  getComment(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`comment/${id}`, {headers});
  }
  editComment(comment, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`editComment/${id}`, comment, {headers});
  }
  deleteComment(comment) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.Url+`deleteComment/${comment}` ,comment, {headers});
  }
}
