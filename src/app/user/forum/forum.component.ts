import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  topics: any;
  date : any[] = [];
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.forumService.getTopics().subscribe(file => {
      this.topics = file.json();
      this.topics.forEach(topic => {
        this.date[topic.id] = moment(topic.date, "YYYYMMDDTh:mm:ss").fromNow()
      })
    });
  }
  show(id) {
    this.router.navigate([`/question/${id}`], id);
  }
}
