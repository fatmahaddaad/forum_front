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
  logged
  isAdmin: boolean
  isModerator: boolean
  isPromoted: boolean
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService) { this.notifier = notifierService; }

  ngOnInit() {
    this.forumService.getCurrentUser().subscribe(file => {
      this.logged = file.json().isLogged
      if (this.logged.roles.includes('ROLE_ADMIN')) {
        this.isAdmin = true
      }
      if (this.logged.roles.includes('ROLE_MODERATOR')) {
        this.isModerator = true
      }
    })
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.forumService.getUser(id).subscribe(file => {
      this.data = file.json()
      console.log(this.data);
      this.isPromoted = this.data.user.roles.includes('ROLE_MODERATOR')
      this.birthdate = moment(this.data.user.birthdate, "YYYYMMDDTh:mm:ss").format('YYYY-MM-DD')
      file.json().topics.forEach(topic => {
        this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
      })
    })
    
  }
  promote() {
    let id = this.route.snapshot.paramMap.get('id');
    const user = {
    }
    this.forumService.promoteUser(id, user).subscribe(res => {
      this.notifier.notify("success", "User promoted successfully")
      this.forumService.getUser(id).subscribe(file => {
        this.data = file.json()
        this.isPromoted = this.data.user.roles.includes('ROLE_MODERATOR')
        this.birthdate = moment(this.data.user.birthdate, "YYYYMMDDTh:mm:ss").format('YYYY-MM-DD')
        file.json().topics.forEach(topic => {
          this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
        })
      })
    }, (err) => {
      console.log(err);
    })
    // todo 
  }
  showTopic(id) {
    this.router.navigate([`/forum/question/${id}`], id);
  }
  showCategory(id) {
    this.router.navigate([`/forum/category/${id}`], id);
  }
}
