import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  baseurl= 'http://localhost:8089/api/seller/';
  constructor(public http: HttpClient) { }

  // tslint:disable-next-line:typedef
  login(model: any) {
    return this.http.post<User>(this.baseurl + 'auth/login' , model ).pipe(
      map((response: User)=> {
        const seller = response;
        if (seller) {
          localStorage.setItem('seller', JSON.stringify(seller));
          this.currentUserSource.next(seller);
        }
      }),
       catchError(this.handleError)
      );
  }

  // tslint:disable-next-line:typedef
  setCurrentUser(seller: User) {
    this.currentUserSource.next(seller);
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  getProfile() {
    let seller = JSON.parse(localStorage.getItem('seller') || '{}');
    let id = seller.passportId ;
    // const header = new HttpHeaders().set('Authorization','Bearer ' + seller.token); 
    let api = this.baseurl + `account/${id}`;
    // return this.http.get(api, { headers: header }).pipe(
    return this.http.get(api).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    )
  } 

  logout(){
    localStorage.removeItem('seller');
    this.currentUserSource.next(null!);
    location.reload();
  }

}
