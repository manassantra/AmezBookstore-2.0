import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl = 'https://localhost:5001/api/';

  constructor(public http: HttpClient) { }

  // tslint:disable-next-line:typedef
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'admin/adminlogin' , model ).pipe(
      map((response: User) => {
        const admin = response;
        if (admin){
          localStorage.setItem('admin', JSON.stringify(admin));
          this.currentUserSource.next(admin);
        }
    }),
    catchError(this.handleError)
    );
    
  }

  getAllUser() {
  return  this.http.get(this.baseUrl+'user').pipe(
    map((res) => {
      return res;
    }),
    catchError(this.handleError)
  )
  }

  GetAllSeller() {
    return  this.http.get(this.baseUrl+'seller').pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    )
  }

  // tslint:disable-next-line:typedef
  setCurrentUser(admin: User) {
    this.currentUserSource.next(admin);
  }

  logout(){
    localStorage.removeItem('admin');
    this.currentUserSource.next(null!);
    location.reload();
  }

  //getProfile
  getProfile() {
    let user = JSON.parse(localStorage.getItem('admin') || '{}');
    let id = user.id ;
    const header = new HttpHeaders().set('Authorization','Bearer ' + user.token); 
    let api = `https://localhost:5001/api/admin/getadmin/${id}`;
    return this.http.get(api, { headers: header }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    )
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

  // tslint:disable-next-line:typedef
  register(model: any) {
    // console.log(model);
     return this.http.post<User>(this.baseUrl + 'admin/registerAdmin' , model ).pipe(
       map((response: User) => {
         return response;
       })
       );
   }

}
