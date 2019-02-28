import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  topics: any;
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.forumService.getTopics().subscribe(file => {
      this.topics = file.json();
    });
  }
  show(id) {
    this.router.navigate([`/question/${id}`], id);
  }
}
