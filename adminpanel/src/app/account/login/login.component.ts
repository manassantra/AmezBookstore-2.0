import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  password: any = 'password';
  eyeslash = 'bi-eye-slash';
  model: any = {};
  constructor(public accService: AccountService) { }

  ngOnInit(): void {
    var user: User = JSON.parse(localStorage.getItem('admin') || '{}');
    this.model = user;
    if (this.model.token) {
      Swal.fire({
        'timer': 3000,
        'text': 'You already logged in !'
      })
      window.location.replace("/");
    }
  }

  login() {
    console.log(this.model);
   this.accService.login(this.model).subscribe(res=>{
    Swal.fire({
      timer: 1500,
      text: 'Login Successfully',
    });
    location.replace('/dashboard');
  }, error => {
    console.log(error);
    Swal.fire({
      title: 'Please verify Details !',
      text: `${error.error}`,
      icon: 'warning'
    });
    location.reload();
  });
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

}
