import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userList: any = {};
  sellerList: any = {};
  constructor(public accService: AccountService) { }

  ngOnInit(): void {
    this.getUserList();
    this.getSellerList();
  }

  getUserList() {
    this.accService.getAllUser().subscribe(res=>{
      this.userList = res;
    })
  }

  getSellerList() {
    this.accService.GetAllSeller().subscribe(res=>{
      this.sellerList = res;
    })
  }

}
