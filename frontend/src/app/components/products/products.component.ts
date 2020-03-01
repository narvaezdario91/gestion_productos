import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';

declare var M:any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  constructor( public productService : ProductService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addProduct(form: NgForm){

    if(form.value._id){
      this.productService.updateInstance(form.value)
        .subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Producto modificado'});
          this.getProducts();
        });
    }else{
      this.productService.createInstance(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Producto creadO'});
        this.getProducts();
      });
    }
      
  }

  getProducts(){
    this.productService.getList()
      .subscribe(res => {
        this.productService.productsList = res as Product[];
        console.log(res);
      });
  }

  resetForm(form ?: NgForm){
    if(form){
      form.reset();
      this.productService.selectedProduct = new Product();
    }
  }

  editProduct(product: Product){
    this.productService.selectedProduct = product;
  }

  deleteProduct(product: Product){
    this.productService.deleteInstance(product._id)
      .subscribe(res => {
        M.toast({html: 'Producto eliminado'});
        this.getProducts();
      });

  }

}
