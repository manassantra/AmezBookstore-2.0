import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any ;
  load: boolean;
  register: boolean;

  constructor(private httpClient: HttpClient, private cart: CartService) { }

  // tslint:disable-next-line:variable-name
  base_url = 'http://localhost:8089/api/v1/products/all';
  // tslint:disable-next-line:no-trailing-whitespace

  ngOnInit(): void {
    this.load = true;
    this.getList();
        setTimeout(() => {
            this.load = false,
            this.register = true;
        }, 2000)
  }

  // tslint:disable-next-line:typedef
  getList() {
   this.productList = this.httpClient.get(this.base_url).subscribe(data => {
    this.productList = data;
   // console.log(this.productList);
   this.productList.forEach((a: any) => {
     Object.assign(a, {qty: 1, price: a.price});
   });
   } , error => {
     console.log(error);
   });
  }

  addToCart(item: any) {
    this.cart.addToCart(item);
  }

}
