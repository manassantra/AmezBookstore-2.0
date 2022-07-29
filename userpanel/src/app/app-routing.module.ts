import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './account/customer/checkout/checkout.component';
import { LoginComponent } from './account/customer/login/login.component';
import { SignupComponent } from './account/customer/signup/signup.component';
import { ProfileComponent } from './account/profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { RouteGuardService } from '../app/service/route-gurd.service';
import { PaymentComponent } from './account/payment/payment.component';
import { OrdersComponent } from './account/customer/orders/orders.component';

const routes: Routes = [
  {
    path: '' , component: ProductsComponent
  },
  {
    path: 'products' , component: ProductsComponent
  },
  {
    path: 'product-details/:id', component: ProductDetailsComponent
  },
  {
    path: 'cart' , component: CartComponent
  },
  {
    path: 'categories' , component: CategoriesComponent
  },
  {
    path: 'account/customer/login', component: LoginComponent 
  },{
    path: 'account/customer/signup', component: SignupComponent
  },{
    path: 'account/profile', component: ProfileComponent , canActivate: [RouteGuardService]
  },
  {
    path: 'account/customer/checkout' , component: CheckoutComponent , canActivate: [RouteGuardService]
  },
  {
    path: 'account/customer/orders' , component: OrdersComponent , canActivate: [RouteGuardService]
  },
  {
    path: 'account/payment' , component: PaymentComponent , canActivate: [RouteGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
