import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';

declare var M:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  constructor( public categoryService : CategoryService, private router: Router ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addCategory(form: NgForm){

    if(form.value._id){
      this.categoryService.updateInstance(form.value)
        .subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Categoria modificada'});
          this.getCategories();
        });
    }else{
      this.categoryService.createInstance(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Categoria creada'});
        this.getCategories();
      });
    }
      
  }

  getCategories(){
    this.categoryService.getList()
      .subscribe(res => {
        this.categoryService.categoriesList = res as Category[];
      });
  }

  resetForm(form ?: NgForm){
    if(form){
      form.reset();
      this.categoryService.selectedCategory = new Category();
    }
  }

  editCategory(category: Category){
    this.categoryService.selectedCategory = category;
  }

  deleteCategory(category: Category){
    this.categoryService.deleteInstance(category._id)
      .subscribe(res => {
        M.toast({html: 'Categoria eliminada'});
        this.getCategories();
      });

  }

  addProducts(category: Category){
    this.router.navigate(['./products']);
  }
}
