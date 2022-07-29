import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from './models/user';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  model: any = {};
  user: any;
  url = 'https://t3.ftcdn.net/jpg/03/63/24/32/360_F_363243212_vEgJwIeEZ3Xt3G9xVHTT6Sw94ywhM6r7.jpg'
  isLoggedin: boolean = true;
  // private currentUserSource = new ReplaySubject<User>(1);
  // currentUser$ = this.currentUserSource.asObservable();
  title = 'sellerpanel';
  constructor(public accService: AccountService) {

  }
  ngOnInit(): void {
      let seller = localStorage.getItem('seller');
      if (seller) {
         this.user = seller ;
      }
  }

  login() {
  //  console.log(this.model);
    this.accService.login(this.model).subscribe(res=>{
      Swal.fire({
        timer: 1500,
        text: 'Login Successfully',
      });
      location.reload();
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Please verify Details !',
        text: `${error.error}`,
        icon: 'warning'
      });
    });
  }
}
