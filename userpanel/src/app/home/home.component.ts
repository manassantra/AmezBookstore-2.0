import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list: any = [];

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:variable-name
  base_url = 'https://60ae496680a61f0017332ed3.mockapi.io/api/upcoming-product';
  // tslint:disable-next-line:no-trailing-whitespace

  ngOnInit(): void {
    this.getList();
  }

  // tslint:disable-next-line:typedef
  getList() {
   this.list = this.httpClient.get(this.base_url).subscribe(data => {
    this.list = data;
    console.log(this.list);
   } , error => {
     console.log(error);
   });
  }

}
