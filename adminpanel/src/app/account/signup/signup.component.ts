import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  model: any = {} ;
  name : any;
  roles: any;
  constructor(public accountService: AccountService, public http: HttpClient) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.http.get('https://localhost:5001/api/admin/roles').subscribe(res=>{
      this.roles = res ;
    })
  }

  signup(){
  //  console.log(this.model);
    this.accountService.register(this.model).subscribe(res =>{
      if(res){
        Swal.fire({
          timer: 3000,
          title: 'Registration Successful !',
          icon: 'success'
        });
        window.location.replace("/account/login");
      }
    }, err => {
      if(err){
        console.log(err.error);
        Swal.fire(
          'Ah oh !',
          'There is some issue, please check',
          'warning'
        ).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
          window.location.reload();
        })
      }
    })
  }

}
