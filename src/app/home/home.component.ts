import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ForumService } from '../services/forum.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logged
  isAdmin: boolean
  isModerator: boolean
  constructor(public auth: AuthService,
    private router: Router,
    private forumService: ForumService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated([])) {
      this.forumService.getCurrentUser().subscribe(file => {
        this.logged = file.json().isLogged
        if (this.logged.roles.includes('ROLE_ADMIN')) {
          this.isAdmin = true
        }
        if (this.logged.roles.includes('ROLE_MODERATOR')) {
          this.isModerator = true
        }
      })
    }
  }
  onLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate([`/user/login/`]);
  }

}
