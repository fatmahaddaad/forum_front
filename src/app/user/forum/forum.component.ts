import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  topics: any;
  date : any[] = [];
  searchInput: string = "";
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
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
    this.router.navigate([`/question/${id}`], id);
  }
  onLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate([`/user/login/`]);
  }
}
