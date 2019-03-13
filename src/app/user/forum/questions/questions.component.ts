import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  topics: any;
  date : any[] = [];
  searchInput: string = "";
  categories: any;
  currentUserId;
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.forumService.getCurrentUser().subscribe(file => { 
      this.currentUserId = file.json().isLogged.id
    });
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    this.forumService.getTopics().subscribe(file => {
      this.topics = file.json();
      this.topics.forEach(topic => {
        this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
      })
    });
  }
   filterStatus(statut){
     if(statut === 'All'){
       this.ngOnInit();
     }
     else{
      this.forumService.getTopics().subscribe(file => {
        this.topics = file.json().filter(topic => topic.status.includes(statut));;
        this.topics.forEach(topic => {
          this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
        });
     });
    }

   }
   filterSearch(research){
     console.log(research.target.value  );
    if(research.target.value !== "" && research.target.value !== undefined && research.target.value !== null){
      this.forumService.getTopics().subscribe(file => {
        this.topics = file.json().filter(topic => topic.subject.includes(research.target.value) || topic.content.includes(research.target.value));
        this.topics.forEach(topic => {
          this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
        });
     });
      }
     else{
      this.ngOnInit();
      }
   }
  show(id) {
    this.router.navigate([`/forum/question/${id}`], id);
  }
  showCategory(id) {
    this.router.navigate([`/forum/category/${id}`], id);
  }
  showUser(id, username) {
    if (this.currentUserId == id) {
      this.router.navigate([`/user/profile`]);
    } else {
      this.router.navigate([`/user/user/${id}/${username}`], id);
    }
  }
}
