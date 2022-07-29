import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);
  

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    if (this.cartItemList.length === 0) {
     this.cartItemList.push(product);
     this.productList.next(this.cartItemList);
    }
    else {
      let b = product,c=0;
      this.cartItemList.forEach((a: any) => {
        if (product.id === a.id) {
          b = a;
          c=1
        }
      }); 
          if (product.id === b.id && c===1){
          if (b.qty < 10) {
            b.qty += 1;
            this.productList.next(this.cartItemList);
          } else {
            alert("you can't add more then 10 quantity");
          }
        }  
        else
         {
          this.cartItemList.push(product);
          this.productList.next(this.cartItemList);
        }
    }
   this.getTotalPrice();
  }

  getTotalPrice() : number {
    let grandTotal: number = 0 ;
    this.cartItemList.map((a:any) => {
      grandTotal += +parseInt(a.price)* a.qty;
    })
    return grandTotal;
  }

   removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
    console.log(this.cartItemList);
  } 

  clearCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
