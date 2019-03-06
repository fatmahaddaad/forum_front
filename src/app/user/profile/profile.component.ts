import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  categories: any;
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    this.forumService.getCurrentUser().subscribe(file => {
      this.forumService.getprofile(file.json().isLogged.id).subscribe(file => {
        this.currentUser = file.json();
        console.log(this.currentUser);
      });
    });
  }
  edit() {
    this.router.navigate([`/user/profile/edit/${this.currentUser.id}`], this.currentUser.id);
  }

}
