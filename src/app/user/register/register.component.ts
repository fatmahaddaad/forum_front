import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private readonly notifier: NotifierService;
  email: string;
  username: string;
  password: string;
  constructor(private forumService: ForumService,
    notifierService: NotifierService,
    private router: Router,) { 
      this.notifier = notifierService;
    }

  ngOnInit() {
  }
  onRegister(){
    const user ={
      username : this.username,
      email : this.email,
      password : this.password
    }
    console.log(user);
    
    this.forumService.createUser(user).subscribe(res =>
    {
    this.notifier.notify( 'success', 'User account created successfully' );
    this.router.navigate([`/login/`]);
    }, (err) => {
      console.log(err);
      this.notifier.notify( 'error', 'An error occurred while creating a new user' );
    });
  }

}
