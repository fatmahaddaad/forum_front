import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { NotifierService } from 'angular-notifier';

import { ForumService } from '../../../services/forum.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private readonly notifier: NotifierService;
  categories
  categoryID
  updateCategoryForm: FormGroup
  description: any
  name: string
  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService,) {
      this.notifier = notifierService;
     }

  ngOnInit() {
    this.forumService.getCategories().subscribe(file => {
      this.categories = file.json();
    });
    this.updateCategoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });
  }
  categoryModalToggle(id) {
    this.categoryID = id;
    this.forumService.getOneCategory(id).subscribe(file => {
      this.updateCategoryForm = new FormGroup({
        name: new FormControl(file.json().name, [Validators.required]),
        description: new FormControl(file.json().description, [Validators.required]),
      });
    })
  }
  categoryDeleteModal(id)
  {
    this.categoryID = id;
  }
  showCategory(id) {
    this.router.navigate([`/forum/category/${id}`], id);
  }
  onAddCategory() {
    if(this.description == undefined) {
      this.description = "";
    }
    const category ={
      name : this.name,
      description : this.description,
    }
    console.log(category);
    
    this.forumService.addCategory(category).subscribe(res =>
    {
      this.notifier.notify( 'success', 'Category added successfully' );
      this.forumService.getCategories().subscribe(file => {
        this.categories = file.json();
      });
    }, (err) => {
      this.notifier.notify( 'error', err.json().message );
    });
  }
  onEditCategory(id) {
    const category = this.updateCategoryForm.value;
    
    this.forumService.editCategory( id, category).subscribe(res =>
    {
      this.notifier.notify( 'success', 'Category Updated Successfully' );
      this.forumService.getCategories().subscribe(file => {
        this.categories = file.json();
      });
    }, (err) => {
      this.notifier.notify( 'error', 'An error occurred while updating this Category' );
    });
  }
  deleteCategory(id) {
    this.forumService.deleteCategory(id).subscribe(res => {
      this.notifier.notify('success', 'Category Deleted Successfully');
      this.forumService.getCategories().subscribe(file => {
        this.categories = file.json();
      });
    }, (err) => {
      this.notifier.notify('error', 'An error occured while deleting this Category')
    })
  }
}
