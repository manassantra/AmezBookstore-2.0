import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  disabledAgreement: boolean = true;
  color = 'btn-secondary';
  model: any = {} ;
  name : any;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  changeCheck(event){
    console.log(event.target.checked)
    if(event.target.checked) {
      this.disabledAgreement = false;
      this.color = 'btn-info';
    } else {
      this.disabledAgreement = true;
      this.color = 'btn-secondary';
    }
  }

  signup() {
  //  this.accountService.register(this.model);
    this.accountService.register(this.model).subscribe(res =>{
      if(res){
        Swal.fire({
          timer: 3000,
          title: 'Registration Successful !',
          icon: 'success'
        });
        window.location.replace("/account/customer/login");
      }
    }, err => {
      if(err){
        Swal.fire(
          'Ah oh !',
          'There is some issue, please check' +'<br>'+`${err.error}`,
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
