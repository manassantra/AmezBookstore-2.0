import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  curentUser: any = {};
  username: any;
  picture = `https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg`
  constructor(public accService: AccountService) { }

  ngOnInit(): void {
    this.accService.getProfile().subscribe(res=>{
      this.curentUser = res;
      this.username = this.curentUser.fullName;
    })
  }

  logout() {
    this.accService.logout();
  }

}
