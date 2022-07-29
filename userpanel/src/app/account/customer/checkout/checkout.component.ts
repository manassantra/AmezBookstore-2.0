import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  profile: any = {};
  addressList: any = {};
  totalPrice: any;
  cartList: any;
  addressId: any;

  constructor(public accSrvc: AccountService, public cart: CartService) {
   }

  ngOnInit(): void {
    this.accSrvc.getProfile().subscribe(res=>{
      this.profile = res;
      console.log(this.profile.userName);
      this.accSrvc.getAddressbyId().subscribe(res=>{
        this.addressList = res;
        console.log(this.addressList);
       })
    });
    this.totalPrice = this.cart.getTotalPrice();
    this.cart.getProducts().subscribe(res => {
      this.cartList = res;
      console.log(this.cartList)
    })
    if (this.cartList.length == 0) {
      window.location.replace('/cart');
    }
  }

  addAddress(e: any) {
    console.log(e.target.value);
    localStorage.setItem('addressId', e.target.value);
  }
}
