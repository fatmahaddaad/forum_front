import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  topic: any;
  replies: any;
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.forumService.getTopic(id).subscribe(file => {
      this.topic = file.json();
      if (this.topic.replies.length != 0) {
        this.forumService.getRepliesByTopic(id).subscribe(file => {
          this.replies = file.json();
          console.log(this.replies);
        });
      }
    });
  }

}
