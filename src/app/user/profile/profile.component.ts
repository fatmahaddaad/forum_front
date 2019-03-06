import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

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
  birthdate;
  updateForm: FormGroup;
  fullname;
  email;
  username;
  company;
  website;
  bio;
  MyClass: boolean = true;
  private readonly notifier: NotifierService;
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    public auth: AuthService) { this.notifier = notifierService; }

  ngOnInit() {
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    this.forumService.getCurrentUser().subscribe(file => {
      this.forumService.getprofile(file.json().isLogged.id).subscribe(file => {
        this.currentUser = file.json();
        this.birthdate = moment(this.currentUser.birthdate, "YYYYMMDDTh:mm:ss").format('YYYY-MM-DD')
        console.log(this.currentUser);
        this.updateForm = new FormGroup({
          fullname: new FormControl(this.currentUser.fullname),
          email: new FormControl({value: this.currentUser.email, disabled: true}, [Validators.required, Validators.email]),
          username: new FormControl({value: this.currentUser.username, disabled: true}, [Validators.required]),
          company: new FormControl(this.currentUser.company),
          birthdate: new FormControl(moment(this.currentUser.birthdate, "YYYYMMDDTh:mm:ss").format('YYYY-MM-DD')),
          website: new FormControl(this.currentUser.website),
          bio: new FormControl(this.currentUser.bio),
        });
      });
    });
  }
  onUpdate(id) {
    const user = this.updateForm.value;
    console.log(user);
    this.forumService.editProfile(user, id).subscribe(res =>
    {
      this.notifier.notify( 'success', 'Profile Updated Successfully' );
      this.forumService.getprofile(id).subscribe(file => { 
        this.currentUser = file.json();
        this.birthdate = moment(this.currentUser.birthdate, "YYYYMMDDTh:mm:ss").format('YYYY-MM-DD')
      });
    }, (err) => {
      this.notifier.notify( 'error', 'error' );
    });
  }
  edit() {
    // this.router.navigate([`/user/profile/edit-profile/`]);
    let element = document.getElementById('edit_profile_form');
    if(element.className.indexOf('hidden') !== -1)
    {
      this.MyClass= false;
    }
    else
    {
      this.MyClass= true;
    }
  }

}
