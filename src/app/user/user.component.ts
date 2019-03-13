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
  logged
  isAdmin: boolean
  isModerator: boolean
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService) { }

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
        console.log(this.auth.isAuthenticated([]));
      })
    }
  }
  onLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate([`/user/login/`]);
  }
}
