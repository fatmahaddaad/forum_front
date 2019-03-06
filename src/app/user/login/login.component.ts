import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  username: string;
  password: string;
  constructor(private forumService: ForumService,
    notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router,
    private http: Http) {
      this.notifier = notifierService;
     }

  ngOnInit() {
  }
  onLogin(){
    const user ={
      username : this.username,
      password : this.password
    }
    if (user.username && !user.password) {
      this.notifier.notify( 'error', 'password required' );
    } else if (!user.username && user.password) {
      this.notifier.notify( 'error', 'username required' );
    } else if (user.password && user.username) {
      this.forumService.loginUser(user).subscribe(res =>
      {
        localStorage.setItem('token', JSON.parse(res.text()).token);
        this.notifier.notify( 'success', 'User Authentificated Successfully' );
        this.router.navigate([`/forum/questions/`]);
      }, (err)=> {
        this.notifier.notify( 'error', err.statusText );
      });
    } else {
      this.notifier.notify( 'error', 'username and password required' );
    }
  }
}
