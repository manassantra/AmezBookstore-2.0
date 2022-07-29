import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filterUpi: any;
  productList: any;
  totalProducts: any;
  productCategory: any = {}

  constructor(public productSvc: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
    this.getProdCategory();
  }

  changeCategory(e:any) {
    this.filterUpi = e.target.value;
    if (this.filterUpi === '*') {
      this.productSvc.getAllProduct().subscribe(res=>{
        this.productList = res;
        this.totalProducts = this.productList.length;
        // console.log(this.productList)
      }, err=>{
        console.log(err)
      })
    } else {
      
    }
  }

  getProdCategory() {
    this.productSvc.getProductCategories().subscribe(res=>{
      this.productCategory = res;
    }, err=>{
      console.log(err);
    })
  }

  // Fetch All Product
  getProductList() {
    this.productSvc.getAllProduct().subscribe(res=>{
      this.productList = res;
      this.totalProducts = this.productList.length;
      // console.log(this.productList)
    }, err=>{
      console.log(err)
    })
  }

}
