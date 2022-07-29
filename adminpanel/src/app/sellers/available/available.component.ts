import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {

  badgeColor: any ;
  sellersList: any = [];
  constructor(public accService: AccountService) { }

  ngOnInit(): void {
    this.sellerList();
    if(this.sellersList.isActive = true) {
      this.badgeColor = 'badge-success';
    } else
    this.badgeColor = 'badge-secondary';
  }

  sellerList() {
    this.accService.GetAllSeller().subscribe(res=>{
      this.sellersList = res;
     // console.log(this.sellersList)
    })
  }

}
