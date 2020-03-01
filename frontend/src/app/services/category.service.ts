import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  selectedCategory: Category;
  categoriesList : Category[];

  readonly URL_API = 'http://localhost:3000/api/categories/';

  constructor(private http: HttpClient) { 
    this.selectedCategory = new Category();
  };

  getList(){
    return this.http.get(this.URL_API);
  }

  createInstance(instance : Category){
    return this.http.post(this.URL_API, instance);
  }

  updateInstance(instance : Category){
    return this.http.put(this.URL_API + `${instance._id}`, instance);
  }

  deleteInstance(_id : string){
    return this.http.delete(this.URL_API+ _id);
  }
}
