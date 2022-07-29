import { getLocaleDateTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  placedorderDetails: any = [];
  amount: any;
  userDetails: any;
  userId: any;
  constructor(public cart: CartService, public orderService: OrderService) { }

  ngOnInit(): void {
  /*  this.orderDetails = this.orderList.source._value;
    this.placedorderDetails = {
      orderList : this.orderDetails,
      totalAmount : this.amount,
      userId : this.userId
    } */
    this.orderList = (this.cart.getProducts());
    this.orderDetails = this.orderList.source._value;
    localStorage.setItem('cart', JSON.stringify(this.orderDetails));
    this.amount = this.cart.getTotalPrice();
    this.stripePaymentGateway();
  }
  strikeCheckout:any = null;
  paymentDetails: any = {};
  paymentType: any;
  orderDetails: any = [];
  orderList: any = [];
  paymentId: any;
  
  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51K1SN9SCME3d3wpjLSsy4b8UP3xFUzS4QjFx2i4NEbERYDDpcQ7hs3O2SYxRTnqKkjcgSKzTSVeSI5ZQKm3q3qbN00ZAVrgZGm',
      locale: 'auto',
      token: function (stripeToken: any) {
        this.paymentDetails = stripeToken;
        this.paymentType = this.paymentDetails.card.brand;
        this.paymentId = this.paymentDetails.card.id;
        const user:User = JSON.parse(localStorage.getItem('user'));
        this.userId = user.passportId;
        const Details = JSON.parse(localStorage.getItem('cart'));
        // const addressId = JSON.parse(localStorage.getItem('addressId'));
        const addressId = localStorage.getItem('addressId');
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes();
        this.placedorderDetails = {
          OrderDetails : Details,
          TotalPrice : amount,
          UserId : this.userId,
          PaymentId : this.paymentId,
          OrderState : 'Order Placed',
          OrderDate: date ,
          addressId: addressId
        }
        localStorage.removeItem('addressId');
        localStorage.setItem('order', JSON.stringify(this.placedorderDetails));
        console.log(this.placedorderDetails);
        Swal.fire({
          timer: 2500,
          title: 'Thank You !',
          text: 'Payment via ' + `${this.paymentType}` + ' successfull' ,
          icon: 'success'
        }).then((result) => {
                localStorage.removeItem('total');
                localStorage.removeItem('cart');
                window.location.replace("/account/customer/orders");
        })
      }
    });

    strikeCheckout.open({
      name: 'Complete Your Purchase',
      description: 'Payment in Testing Mode',
      currency: 'INR',
      amount: amount*100
    });   
  }
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51K1SN9SCME3d3wpjLSsy4b8UP3xFUzS4QjFx2i4NEbERYDDpcQ7hs3O2SYxRTnqKkjcgSKzTSVeSI5ZQKm3q3qbN00ZAVrgZGm',
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
          }
        });
      }
      window.document.body.appendChild(scr);
    }
  }
}


