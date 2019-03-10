import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

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
  categories: any;
  currentUserId;
  updateTopicForm: FormGroup;
  updateReplyForm: FormGroup;
  replyID
  updateCommentForm: FormGroup;
  commentID
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService,
    private renderer: Renderer2, 
    private el: ElementRef) { 
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.updateReplyForm = new FormGroup({
      content: new FormControl("", [Validators.required]),
    });
    this.updateCommentForm = new FormGroup({
      content: new FormControl("", [Validators.required]),
    });
    this.forumService.getCurrentUser().subscribe(file => { 
      this.currentUserId = file.json().isLogged.id
    });
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.forumService.getRepliesByTopic(id).subscribe(file => {
      this.topic = file.json().topic;
      this.updateTopicForm = new FormGroup({
        subject: new FormControl(this.topic.subject, [Validators.required]),
        content: new FormControl(this.topic.content, [Validators.required]),
      });
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
  replyFormToggle(id) {
    this.replyID = id;
    this.forumService.getReply(id).subscribe(file => {
      this.updateReplyForm = new FormGroup({
        content: new FormControl(file.json().content, [Validators.required]),
      });
    })
  }
  deleteTopic(id) {
    this.forumService.deleteTopic(id).subscribe(res =>{
      this.notifier.notify( 'success', 'Topic Deleted Successfully' );
      this.router.navigate(['/forum/questions']);
    }, (err) => {
      this.notifier.notify( 'error', 'An error occurred while deleting this Topic' );
    });
  }
  replyDeleteModal(id)
  {
    this.replyID = id;
  }
  deleteReply(id) {
    this.forumService.deleteReply(id).subscribe(res => {
      this.notifier.notify('success', 'Reply Deleted Successfully');
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify('error', 'An error occured while deleting this reply')
    })
  }
  onEditTopic(id){
    console.log("ed "+id);
    const topic = this.updateTopicForm.value;
    console.log(topic);
    console.log(id);
    
    this.forumService.editTopic(topic, id).subscribe(res =>
    {
      this.notifier.notify( 'success', 'Topic Updated Successfully' );
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify( 'error', 'An error occurred while updating this Topic' );
    });
  }
  onEditReply(id){
    console.log("ed "+id);
    const reply = this.updateReplyForm.value;
    console.log(reply);
    console.log(id);
    
    this.forumService.editReply(reply, id).subscribe(res =>
    {
      this.notifier.notify( 'success', 'Reply Updated Successfully' );
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify( 'error', 'An error occurred while updating this Reply' );
    });
  }
  commentModalToggle(id) {
    this.commentID = id;
    this.forumService.getComment(id).subscribe(file => {
      this.updateCommentForm = new FormGroup({
        content: new FormControl(file.json().content, [Validators.required]),
      });
    })
  }
  commentDeleteModal(id)
  {
    this.commentID = id;
  }
  deleteComment(id) {
    this.forumService.deleteComment(id).subscribe(res => {
      this.notifier.notify('success', 'Comment Deleted Successfully');
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify('error', 'An error occured while deleting this Comment')
    })
  }
  onEditComment(id){
    console.log("ed "+id);
    const comment = this.updateCommentForm.value;
    console.log(comment);
    
    this.forumService.editComment(comment, id).subscribe(res =>
    {
      this.notifier.notify( 'success', 'Comment Updated Successfully' );
      this.ngOnInit();
    }, (err) => {
      this.notifier.notify( 'error', 'An error occurred while updating this Comment' );
    });
  }
}
