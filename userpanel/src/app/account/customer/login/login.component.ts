import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   model: any = {} ;
   logedIn: boolean;
   password: any = 'password';
   eyeslash: any = 'bi-eye'
  constructor( private accountService: AccountService) { }


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if ( user ) {
      this.logedIn = false;
      Swal.fire({
        timer: 2000,
        text: 'You are already logged in',
      });
      window.location.replace("/");
    } else {
      this.logedIn = true;
    }
  }

  decryptData() {
    if (this.password == 'password') {
      this.password = 'text';
      this.eyeslash = 'bi-eye-slash';
    } else {
      this.password = 'password';
      this.eyeslash = 'bi-eye';
    }
  }
  
  login() {
      console.log(this.model);
        this.accountService.login(this.model).subscribe(response => {
          Swal.fire({
            timer: 1500,
            text: 'Login Successfully',
          });
          window.location.replace("/cart");
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Please verify Details !',
            text: `${error.error}`,
            icon: 'warning'
          });
          this.logedIn = false;
        }); 
  }


}
