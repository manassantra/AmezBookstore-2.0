import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private http: HttpClient , private router: ActivatedRoute , private url: Router, private accountService: AccountService) { }

  id: any;
  token: any;
  details: any = {} ;
  adrsDetails: any = {} ;
  category: any;
  newAddress: any;
  adrsExist: boolean;
  rsp: any ;
  errMsg: any ;
  result: any = {};
  model: any = {};
  mockApi = 'http:://localhost:8089/api/user/address';

  ngOnInit(): void {
    // tslint:disable-next-line:no-string-literal
   // this.id = this.router.snapshot.params['id'];
   let user = JSON.parse(localStorage.getItem('user'));
   this.id = user.id ;
    this.getDetails();
    this.category = [
      "Home" , "Office", "Other"
    ]
  }

  // searchAddress(e: any) {
  //   var pincode ;
  //   console.log( pincode = e.target.value); 
  //   this.http.get('https://api.worldpostallocations.com/pincode',{
  //     params: {
  //       postalcode: pincode,
  //       countrycode: 'IN'
  //     },
  //     observe: 'response'
  //   }).toPromise()
  //   .then(response => {
  //     this.rsp = response;
  //     this.result = this.rsp.body.result;
  //   })
  // }
  // onSelect(e) {
  //   this.newAddress = e;
  //   console.log(this.newAddress);
  //   // if (this.adrsDetails.addressLine2 == null)
  //   // {
  //   //   this.adrsDetails = {
  //   //     addressLine1: this.adrsDetails.addressLine1,
  //   //     addressLine2: this.newAddress.postalLocation,
  //   //     pinCode: this.newAddress.postalCode,
  //   //     city: this.newAddress.province,
  //   //     town: this.newAddress.district,
  //   //     state: this.newAddress.state,
  //   //     country: this.newAddress.country,
  //   //     isActive: true,
  //   //     addressCategory: this.adrsDetails.addressCategory
  //   //   }
  //   //   this.rsp='';
  //   // }
  //   // else 
  //   // {
  //   //   this.adrsDetails = {
  //   //     userId: this.id,
  //   //     addressLine1: this.adrsDetails.addressLine1,
  //   //     addressLine2: this.adrsDetails.addressLine2,
  //   //     pinCode: parseInt(this.newAddress.postalCode),
  //   //     city: this.newAddress.postalLocation,
  //   //     town: this.newAddress.district,
  //   //     state: this.newAddress.state,
  //   //     country: this.newAddress.country,
  //   //     isActive: true,
  //   //     addressCategory: this.adrsDetails.addressCategory
  //   //   }
  //   //   this.rsp='';
  //   // }
  // }

  
  createAddress() {
    if (this.adrsDetails.addressLine1 == null && this.adrsDetails.pincode == null) {
      this.errMsg = "Please fill all required fildes."
    }
   // console.log(this.adrsDetails);
   // this.accountService.createUserAddress(this.adrsDetails);
    this.accountService.createUserAddress(this.adrsDetails).subscribe(res=>{
      if (res) {
        Swal.fire(
          'Wah !',
          'Address Added Successfully',
          'success'
        ).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
          window.location.reload();
        })
      }
    }, err => {
      if (err) {
        console.log(err);
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

    getDetails() {
      this.accountService.getProfile().subscribe(res => {
        this.details = res ;
      //  console.log(this.details)
      })
    }

}
