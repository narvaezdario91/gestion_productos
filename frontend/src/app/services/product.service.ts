import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product;
  productsList : Product[];

  readonly URL_API = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { 
    this.selectedProduct = new Product();
  };

  getList(categoryId : string){
    return this.http.get(this.URL_API+'?category='+categoryId);
  }

  createInstance(instance : Product){
    return this.http.post(this.URL_API, instance);
  }

  updateInstance(instance : Product){
    return this.http.put(this.URL_API+'/'+`${instance._id}`, instance);
  }

  deleteInstance(_id : string){
    return this.http.delete(this.URL_API+'/'+ _id);
  }
}
