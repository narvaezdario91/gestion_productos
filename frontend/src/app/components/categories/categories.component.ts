import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';

declare var M:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  constructor( public categoryService : CategoryService ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(form: NgForm){
    console.log(form.value);
    this.categoryService.createInstance(form.value)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        M.toast({html: 'Categoria creada'});
        this.getCategories();
      })
      
  }

  getCategories(){
    this.categoryService.getList()
      .subscribe(res => {
        this.categoryService.categoriesList = res as Category[];
        console.log(res);
      });
  }

  resetForm(form ?: NgForm){
    if(form){
      form.reset();
      this.categoryService.selectedCategory = new Category();
    }
      
  }
}
