import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

declare var M:any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  private categoryId: string;

  constructor( public productService : ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get("categoryId");
    this.getProducts();
  }

  addProduct(form: NgForm){
    form.value.categoryId = this.categoryId;
    if(form.value._id){
      this.productService.updateInstance(form.value)
        .subscribe(res =>{
          this.resetForm(form);
          M.toast({html: 'Producto modificado'});
          this.getProducts();
        });
    }else{
      form.value._id = undefined;
      this.productService.createInstance(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Producto creado'});
        this.getProducts();
      });
    }
      
  }

  getProducts(){
    this.productService.getList(this.categoryId)
      .subscribe(res => {
        this.productService.productsList = res as Product[];
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
