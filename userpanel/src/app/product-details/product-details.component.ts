import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute , private http: HttpClient, private cart: CartService) { }

  id: any;
  productList: any ;
  qty: 1;
  price: any;

  ngOnInit(): void {
    // tslint:disable-next-line:no-string-literal
    this.id = parseInt(this.router.snapshot.params['id']);
    // console.log(this.id);
    this.getList();
  }

  // tslint:disable-next-line:typedef
  getList() {
    this.productList = this.http.get(`http://localhost:8089/api/v1/products/${this.id}`).subscribe(data => {
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
