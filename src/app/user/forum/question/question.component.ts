import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  private readonly notifier: NotifierService;
  topic: any;
  replies: any;
  content: string;
  comment_content: any[] = [];
  MyClass: boolean[] = [];
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService,
    private renderer: Renderer2, 
    private el: ElementRef) { 
      this.notifier = notifierService;
    }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.forumService.getTopic(id).subscribe(file => {
      this.topic = file.json();
      if (this.topic.replies.length != 0) {
        this.forumService.getRepliesByTopic(id).subscribe(file => {
          this.replies = file.json();
          console.log(this.replies);
          this.replies.forEach(element => {
            this.MyClass[element.id]= true;
          });
        });
      }
    });
  }
  onAddReply() {
    let id = this.route.snapshot.paramMap.get('id');
    const reply ={
      content : this.content,
      topic_id : id
    }
    console.log(reply);
    this.forumService.addReply(reply).subscribe(res =>
      {
      this.notifier.notify( 'success', 'reply added successfully' );
      this.forumService.getRepliesByTopic(id).subscribe(file => {
        this.replies = file.json();
      });
      this.content = null;
      }, (err) => {
        console.log("err "+err);
        this.notifier.notify( 'error', 'An error occurred while adding a new reply: ' + err.statusText );
      });
  }
  onAddComment(reply_id, i) {
    let id = this.route.snapshot.paramMap.get('id');
    const comment ={
      content : this.comment_content[i],
      reply_id : reply_id
    }
    console.log(comment);
    this.forumService.addComment(comment).subscribe(res =>
      {
      this.notifier.notify( 'success', 'comment added successfully' );
      this.forumService.getRepliesByTopic(id).subscribe(file => {
        this.replies = file.json();
      });
      this.comment_content[i] = null;
      }, (err) => {
        console.log("err "+err);
        this.notifier.notify( 'error', 'An error occurred while adding a new comment: ' + err.statusText );
    });
  }
  commentFormToggle(i) {
    let element = document.getElementById('comment_form_'+i);
    if(element.className.indexOf('hidden') !== -1)
    {
      this.MyClass[i]= false;
    }
    else
    {
      this.MyClass[i]= true;
    }
  }

}
