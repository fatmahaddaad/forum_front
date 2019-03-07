import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ForumService } from '../services/forum.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
  }
  onLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate([`/user/login/`]);
  }
}
