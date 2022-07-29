import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {

  constructor(public http: HttpClient, public cart: CartService) { }

  api = 'https://localhost:5001/api/';
  userId : any ;
  token: any;
  model: any;

  ngOnInit(): void {
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.userId = user.passportId;
    this.token = user.token;
  }

  // tslint:disable-next-line:typedef
  placeOrder(id: any, model: any) {
    // this.http.post(`https://localhost:5001/api/order/placedOrder/${id}` , model).subscribe(res=>{
    //   this.model = res;
    // })
    // return this.model ;
  }
}
