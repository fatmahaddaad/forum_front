import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  categories;
  data;
  date: any[] = []
  roles: any[] = []
  arrayRoles: any[] = []
  logged
  isAdmin: boolean
  isModerator: boolean
  private readonly notifier: NotifierService;
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public auth: AuthService) { this.notifier = notifierService; }

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
    this.forumService.getUsers().subscribe(file => {
      this.data = file.json();
      this.data.forEach(element => {
        this.roles = []
        this.date[element.user.id] =  moment(element.user.date, "YYYYMMDD h:mm:ss").fromNow()
        element.user.roles.forEach(role => {
          this.roles.push(role.replace('ROLE_', ' '))
        });
        this.arrayRoles[element.user.id] = this.roles
      });
      console.log(this.data);
      
    });
  }
  blockUser(id) {
    const user ={
      is_active : false
    }
    this.forumService.deactivateUser(user, id).subscribe(res => {
      this.notifier.notify("success", "User is deactivated")
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify("error", err.json().error.message)
    })
  }
  activateUser(id) {
    const user ={
      is_active : true
    }
    this.forumService.activateUser(user, id).subscribe(res => {
      this.notifier.notify("success", "User is activated")
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify("error", err.json().error.message)
    })
  }
  show(id, username) {
    this.router.navigate([`/user/user/${id}/${username}`], id);
  }
}
