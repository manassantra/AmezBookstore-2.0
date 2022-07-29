import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';
//import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient , private router: ActivatedRoute , private url: Router, private accountService: AccountService) { }

  id: any;
  token: any;
  details: any = {} ;
  adrsDetails: any ;
  adrsExist: boolean;
  errMsg: any ;
  category: any;
  model: any = {};
  addressCategoryId: number;
  mockUrl = 'https://60ae496680a61f0017332ed3.mockapi.io/api/customer-details/';
  mockApi = 'https://localhost:5001/api/user/';
  password: any = 'password';
  eyeslash: any = 'bi-eye' ;
  picture = `https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg`

  ngOnInit(): void {
    // tslint:disable-next-line:no-string-literal
   // this.id = this.router.snapshot.params['id'];
    this.id = this.router.snapshot.params['id'];
    this.getDetails();
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
  

    getDetails() {
      this.accountService.getProfile().subscribe(res => {
        this.details = res ;
      this.accountService.getAddressbyId().subscribe(res=>{
        this.adrsDetails = res;
       })
      })
    }

    deactivateAcc(id: any) {
     // console.log(id)
        Swal.fire({
          imageUrl: this.details.avatar,
          imageHeight: 150,
          title: '<h4>Are you sure ' + this.details.name + ' ?</h4>',
          text: 'You would not be able to Login with Your Account !',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Deactivate it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.accountService.deactivateAccount(id);
              console.log('Account DeActivated');
                Swal.fire(
                  'Account De-Activated Successfully',
                  'warning'
                );
            this.accountService.logout();
            window.location.replace('/');
          }
        }); 
    }

    // tslint:disable-next-line:typedef
    delete() {
      if (this.details.id != null ) {
      Swal.fire({
        imageUrl: this.details.avatar,
        imageHeight: 150,
        title: '<h4>Are you sure ' + this.details.name + ' ?</h4>',
        text: 'You would not be able to revert your account back !',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete(this.mockApi + this.id).subscribe( res => {
            console.log('Account Deleted');
            if (res) {
              this.url.navigate(['']);
              Swal.fire(
                'Deleted!',
                'Your account with all information has been deleted.',
                'success'
              );
            }
          }, err => {
            Swal.fire(
              'Sorry!',
              'You cant delete this account',
              'warning'
            );
          });
        }
      });
    }
  }

  // tslint:disable-next-line:typedef
  edit(id: any) {
    this.model = this.details;
    this.accountService.updateAccount(id , this.model);
    Swal.fire(
      'Wah !',
      'Account Information just updated right now',
      'success'
    ).then((result) => {
      if(result.isConfirmed){
        window.location.reload();
      }
      window.location.reload();
    })
  }

  cpass() {
    Swal.fire(
      'sorry !',
      'This features not available right now',
      'warning'
    );
  }

}
