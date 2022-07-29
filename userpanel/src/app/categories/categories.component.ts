import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  list: any = [];

  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line:variable-name
  base_url = 'https://60ae496680a61f0017332ed3.mockapi.io/api/product-list';
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
