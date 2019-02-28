import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  private readonly notifier: NotifierService;
  categories: any;
  subject: string;
  content: string;
  category_id: number;
  constructor(private forumService: ForumService,
    notifierService: NotifierService,
    private router: Router,) {
      this.notifier = notifierService;
     }

  ngOnInit() {
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
  }
  onAsk(){
    const topic ={
      subject : this.subject,
      content : this.content,
      category_id : this.category_id
    }
    console.log(topic);
    
    this.forumService.addTopic(topic).subscribe(res =>
    {
    this.notifier.notify( 'success', 'question added successfully' );
    // this.router.navigate([`/forum/`]);
    console.log("res "+res);
    
    }, (err) => {
      console.log("err "+err);
      this.notifier.notify( 'error', 'An error occurred while adding a new question: ' + err.statusText );
    });
  }
}
