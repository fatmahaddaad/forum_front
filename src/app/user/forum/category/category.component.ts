import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { ForumService } from '../../../services/forum.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category;
  categories;
  data;
  topics;
  replies;
  scores;
  topicDate: any[] = [];
  replyDate: any[] = [];
  commentDate: any[] = [];
  countVote: any[] = [];
  j : number = 0;
  MyClass: boolean[] = []
  replyFormClass: boolean[] = []
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.forumService.getcategory(id).subscribe(file => {
      this.topics = file.json();
      this.topics.forEach(topic => {
        this.topicDate[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
      })
    });
    // this.forumService.getcategory(id).subscribe(file => { 
    //   this.category = file.json()
    //   this.data = file.json().data
    //   console.log(this.data);
      
    //   if (this.data != 0) {
    //     this.data.forEach(element => {
    //       this.topicDate[element.topic.id] = moment(element.topic.date, "YYYYMMDDTh:mm:ss").fromNow()
    //       this.replies = element.replies
    //       this.scores = element.scores
    //     });
    //   }
    // });
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
  }

  show(id) {
    this.router.navigate([`/forum/question/${id}`], id);
  }
  showCategory(id) {
    this.router.navigate([`/forum/category/${id}`], id);
  }
  filterSearch(research){
    console.log(research.target.value  );
    if(research.target.value !== "" && research.target.value !== undefined && research.target.value !== null){
      let id = this.route.snapshot.paramMap.get('id');
      this.forumService.getcategory(id).subscribe(file => {
        this.topics = file.json().filter(topic => topic.subject.includes(research.target.value) || topic.content.includes(research.target.value));
        this.topics.forEach(topic => {
          this.topicDate[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
        })
      });
    }
    else{
      this.ngOnInit();
    }
  }
  filterStatus(statut){
    let id = this.route.snapshot.paramMap.get('id');
    if(statut === 'All'){
      this.ngOnInit();
    }
    else{
     this.forumService.getcategory(id).subscribe(file => {
       this.topics = file.json().filter(topic => topic.status.includes(statut));;
       this.topics.forEach(topic => {
         this.topicDate[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
       });
    });
   }
  }
}
