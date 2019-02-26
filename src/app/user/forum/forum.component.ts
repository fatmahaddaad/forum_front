import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  topics: any;
  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getTopics().subscribe(file => {
      this.topics = file.json();
    });
  }

}
