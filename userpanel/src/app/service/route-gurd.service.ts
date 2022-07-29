import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, } from '@angular/router';
import { User } from '../models/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  userExist: any;
  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.userExist = user;
    if (this.userExist){
      return true;
    } else 
    Swal.fire({
      timer: 1500,
      text: 'You have to login to continiue',
    });
    this.router.navigate(['/account/customer/login']);
  }
}