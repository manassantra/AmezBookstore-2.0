import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: any;
  productDetails: any = {};
  display: boolean = false;
  productCategory: any = {};
  constructor(private router: ActivatedRoute , private productSvc: ProductService) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProductDetails(this.id);
    this.getProdCategory()
  }

  getProdCategory() {
    this.productSvc.getProductCategories().subscribe(res=>{
      this.productCategory = res;
    }, err=>{
      console.log(err);
    })
  }

  getProductDetails(id:any) {
    this.productSvc.getProductDetails(id).subscribe(res=>{
      this.productDetails = res;
      console.log(this.productDetails)
    })
  }

  saveEdit(id:any) {
    this.productSvc.updateProduct(id, this.productDetails).subscribe(res=>{
      alert(`Product Update Successfully.`)
      window.location.replace("/")
    }, err=>{
      alert(`There is an issue with update product details.`)
    })
  }

  close() {
    window.location.replace("/");
  }

}
