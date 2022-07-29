import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }

  getProductList() {
    console.log("ProductList")
  }

  addProductCategory(model: any) {
    let user = JSON.parse(localStorage.getItem('admin') || '{}');
    let id = user.id ;
    console.log(model +','+id)
  }
}
