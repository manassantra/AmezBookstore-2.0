import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  id:any;
  baseapi = `http://localhost:8089/api/v1/`

  constructor(public http: HttpClient) { }

  //Get All Products
  getAllProduct(){
    return this.http.get(this.baseapi + `products/all`);
  }

  //Get Product by ::Id
  getProductDetails(id:any){
    return this.http.get(this.baseapi + `products/productId/${id}`);
  }

  //Create New Product
  createProduct(model:any){
    let seller = JSON.parse(localStorage.getItem('seller') || '{}');
    this.id = seller.passportId;
    return this.http.post(this.baseapi + `products/create/${this.id}`, model);
  }

  //Update Product by :: Product_Id
  updateProduct(id:any, model:any) {
    return this.http.put(this.baseapi + `products/update/${id}`, model);
  }

  // Get All Product Categories
  getProductCategories() {
    return this.http.get( this.baseapi + `productCategory/all`);
  }
}
