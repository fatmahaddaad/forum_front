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
  addVote(vote) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('up', vote.up);
    formData.append('down', vote.down);
    formData.append('reply_id', vote.reply_id);
    return this.http.post(this.Url+"addVote", formData, {headers});
  }
  setBestAnswer(reply, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`setCorrectAnswer/${id}`, reply, {headers});
  }
  deactivateUser(user, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`deactivateUser/${id}`, user, {headers});
  }
  activateUser(user, id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`activateUser/${id}`, user, {headers});
  }
  getUsers() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`users`, {headers});
  }
  getUser(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`user/${id}`, {headers});
  }
  promoteUser(id, user) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`promoteUser/${id}`, user, {headers})
  }
  getOneCategory(id) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.Url+`category/${id}`, {headers});
  }
  addCategory(category) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    const formData: FormData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    return this.http.post(this.Url+"addCategory", formData, {headers});
  }
  editCategory(id, category) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`editCategory/${id}`, category, {headers});
  }
  deleteCategory(category) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.Url+`deleteCategory/${category}` ,category, {headers});
  }
  setClosedTopic(id, topic) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`setTopicClose/${id}`, topic, {headers})
  }
  setResolvedTopic(id, topic) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`setResolved/${id}`, topic, {headers})
  }
  passwordChange(id, user) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.Url+`passwordChange/${id}`, user, {headers})
  }
}
