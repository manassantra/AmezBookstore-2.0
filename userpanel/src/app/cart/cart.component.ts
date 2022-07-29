import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private http: HttpClient, private cart: CartService) { }

  public productList: any = [] ;
  public grandTotal: any ;
  public incrgrandTotal: any ;
  public Total: any ;
  public dlvrChrg1 : number = 65;
  public dlvrChrg2 : number = 35;
  public dlvryCharge: any;
  decQty = '';
  userExist: any;

  ngOnInit(): void {
    this.getProductList();
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.userExist = user ;
  }

  getProductList() {
    this.cart.getProducts().subscribe(res => {
      this.productList = res;
      this.grandTotal = this.cart.getTotalPrice();
      if (this.grandTotal < 500 && this.grandTotal > 0 && this.productList) {
        this.dlvryCharge = this.dlvrChrg1;
        this.Total = this.grandTotal + this.dlvrChrg1;
      //  localStorage.setItem('total', this.Total);
      }
      else if ( this.grandTotal > 500 && this.productList || this.grandTotal <999 && this.productList) {
        this.dlvryCharge = this.dlvrChrg2;
        this.Total = this.grandTotal + this.dlvrChrg2;
      //  localStorage.setItem('total', this.Total);
      }
      if (this.grandTotal > 999) {
        this.dlvryCharge = 'Free';
        this.Total = this.grandTotal ;
      //  localStorage.setItem('total', this.Total);
      }
    })
  }

  increaseQty(item: any){
    this.cart.addToCart(item);
}

  decreaseQty(item: any){
    this.productList.forEach((a: any) => {
      if (item.id === a.id) {
        if (a.qty > 1 ) {
          a.qty -= 1;
          this.getProductList();
        }
        else if (a.qty == 1 && item.id == a.id) {
         alert('you want to clear this item from cart ?');
          this.removeItem(item);
        }
      }
      console.log(this.productList);
    });
}

  removeItem(item: any) {
    this.cart.removeCartItem(item);
  }

  clearCart() {
    this.cart.clearCart();
  }

 }
