import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../service/account.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logo = 'https://t3.ftcdn.net/jpg/03/63/24/32/360_F_363243212_vEgJwIeEZ3Xt3G9xVHTT6Sw94ywhM6r7.jpg';
  itemList: any;
  id: any;
  //isLoggedin: boolean;
  userExist: any;
  constructor(private httpClient: HttpClient, private router: ActivatedRoute, private cart: CartService, private accountService: AccountService, private rtr : Router) { }

  // tslint:disable-next-line:variable-name
  base_url = 'https://60ae496680a61f0017332ed3.mockapi.io/api/product-list';
  // tslint:disable-next-line:no-trailing-whitespace

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
  //  this.getList();
    this.getUsers();
    this.cart.getProducts().subscribe(res => {
      this.itemList = res.length;
    });
  }


  getUsers() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
    this.accountService.getProfile().subscribe(res => {
      this.userExist = res ;
    })
  }

  // tslint:disable-next-line:typedef
  logout() {
    console.log('Logout');
    this.accountService.logout();
    window.location.reload();
  }

}
