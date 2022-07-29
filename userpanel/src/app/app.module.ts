import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './account/customer/login/login.component';
import { SignupComponent } from './account/customer/signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './account/address/address.component';
import { ProfileComponent } from './account/profile/profile.component';
import { PaymentComponent } from './account/payment/payment.component';
import { OrdersHistoryComponent } from './account/customer/orders-history/orders-history.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingXConfig, NgxLoadingXModule, POSITION, SPINNER } from 'ngx-loading-x';
import { CheckoutComponent } from './account/customer/checkout/checkout.component';
import { OrdersComponent } from './account/customer/orders/orders.component';


const ngxLoadingXConfig: NgxLoadingXConfig = {
  bgBlur: 1,
  bgOpacity: 1,
  spinnerType : SPINNER.threeStrings,
  spinnerColor: 'orange',
  spinnerPosition: POSITION.centerCenter,
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    AddressComponent,
    ProfileComponent,
    PaymentComponent,
    OrdersHistoryComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    OrdersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingXModule.forRoot(ngxLoadingXConfig)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
