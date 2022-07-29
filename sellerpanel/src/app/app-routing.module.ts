import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './product/createProduct/create.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';


const routes: Routes = [
  {
     path:'', component: HomeComponent
  },
  {
    path:'product/create', component: CreateProductComponent 
 },{
  path:'product/edit/:id', component: EditProductComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
