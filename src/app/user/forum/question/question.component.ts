import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
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
  votes: any;
  content: string;
  comment_content: any[] = [];
  MyClass: boolean[] = [];
  countVote: any[] = [];
  scores: any;
  j : number = 0;
  date : any;
  replyDate : any[] = [];
  commentDate : any[] = [];
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
    this.forumService.getRepliesByTopic(id).subscribe(file => {
      this.topic = file.json().topic;
      this.date = moment(this.topic.date, "YYYYMMDDTh:mm:ss").fromNow()
      this.replies = file.json().replies;
      this.scores = file.json().scores;
      if (this.replies != 0) {
          this.replies.forEach(element => {
            this.MyClass[element.id]= true;
            this.replyDate[element.id] = moment(element.date, "YYYYMMDDTh:mm:ss").fromNow();
            element.comments.forEach(comment => {
              this.commentDate[comment.id] = moment(comment.date, "YYYYMMDDTh:mm:ss").fromNow();
            });
            this.scores.forEach(score => {
              if (element.id == score.reply) {
                this.countVote[element.id] = score.score;
              }
            })
            this.j = this.j + 1;
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
        this.topic = file.json().topic;
        this.date = moment(this.topic.date, "YYYYMMDDTh:mm:ss").fromNow()
        this.replies = file.json().replies;
        this.scores = file.json().scores;
        if (this.replies != 0) {
            this.replies.forEach(element => {
              this.MyClass[element.id]= true;
              this.replyDate[element.id] = moment(element.date, "YYYYMMDDTh:mm:ss").fromNow();
              element.comments.forEach(comment => {
                this.commentDate[comment.id] = moment(comment.date, "YYYYMMDDTh:mm:ss").fromNow();
              });
              this.scores.forEach(score => {
                if (element.id == score.reply) {
                  this.countVote[element.id] = score.score;
                }
              })
              this.j = this.j + 1;
            });
        }
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
        this.topic = file.json().topic;
        this.date = moment(this.topic.date, "YYYYMMDDTh:mm:ss").fromNow()
        this.replies = file.json().replies;
        this.scores = file.json().scores;
        if (this.replies != 0) {
            this.replies.forEach(element => {
              this.MyClass[element.id]= true;
              this.replyDate[element.id] = moment(element.date, "YYYYMMDDTh:mm:ss").fromNow();
              element.comments.forEach(comment => {
                this.commentDate[comment.id] = moment(comment.date, "YYYYMMDDTh:mm:ss").fromNow();
              });
              this.scores.forEach(score => {
                if (element.id == score.reply) {
                  this.countVote[element.id] = score.score;
                }
              })
              this.j = this.j + 1;
            });
        }
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
