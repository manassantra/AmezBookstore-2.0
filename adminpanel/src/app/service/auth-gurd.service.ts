import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { User } from '../model/user';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGurdService implements CanActivate {

  userExist: any = {};
  constructor(private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var user: User = JSON.parse(localStorage.getItem('admin') || '{}');
    this.userExist = user;
    if(this.userExist.token) {
      return true;
    } else 
    Swal.fire({
      'timer': 3000,
      'text': 'You have to login to continioue'
    });
    location.replace('/account/login')
    return false;
   // throw new Error('Method not implemented.');
  }
}

