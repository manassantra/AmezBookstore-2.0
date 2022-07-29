import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateProductComponent implements OnInit {

  productDetails: any = {}
  productCategory: any = {}
  constructor(public productSvc: ProductService) { }

  ngOnInit(): void {
    this.getProdCategory()
  }

  getProdCategory() {
    this.productSvc.getProductCategories().subscribe(res=>{
      this.productCategory = res;
    }, err=>{
      console.log(err);
    })
  }

  create() {
    this.productSvc.createProduct(this.productDetails).subscribe(res=>{
      if(res){
        alert('Product ' + ` ${this.productDetails.name}` + ' Created Successfully.');
        window.location.replace("/")
      } 
    }, err=>{
      alert(`${err}`)
    })
  }

  close() {
    window.location.replace("/");
  }

}
