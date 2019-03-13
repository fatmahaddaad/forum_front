import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

import { ForumService } from '../../services/forum.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private readonly notifier: NotifierService;
  data
  birthdate
  categories
  date : any[] = [];
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService) { this.notifier = notifierService; }

  ngOnInit() {
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.forumService.getUser(id).subscribe(file => {
      this.data = file.json()
      console.log(this.data);
      this.birthdate = moment(this.data.user.birthdate, "YYYYMMDDTh:mm:ss").format('YYYY-MM-DD')
      file.json().topics.forEach(topic => {
        this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
      })
    })
    
  }
  promote() {
    // todo 
  }
  showTopic(id) {
    this.router.navigate([`/forum/question/${id}`], id);
  }
  showCategory(id) {
    this.router.navigate([`/forum/category/${id}`], id);
  }
}
