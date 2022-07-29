import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Address } from '../models/address';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  profile: any;
  address: any;
  model: any;
  user: any = JSON.parse(localStorage.getItem('user'));
  accountState: any;
  baseUrl = 'https://localhost:5001/';
  apiurl = `http://localhost:8089/api/user/`

  constructor(private http: HttpClient) { 
    
  }

  // tslint:disable-next-line:typedef
  login(model: any) {
    return this.http.post(this.apiurl + 'auth/login' , model ).pipe(
      map((response: User) => {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
    }));
  }

  getProfile() {
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user.passportId ;
    const header = new HttpHeaders().set('Authorization','Bearer ' + this.user.token); 
    let api = `http://localhost:8089/api/user/account/${id}`;
    return this.http.get(api, { headers: header }).pipe(
      map((res: Response) => {
        return this.profile = res;
      }),
      catchError(this.handleError)
    )
  } 

  //getAddress-by-id(for all)
  getAddressbyId() {
    const id = this.user.passportId;
    var baseAPI = this.apiurl + 'address/find/';
    return this.http.get(baseAPI+`${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
      );
  }

  getShippingAddress() {
    const orderDetails = JSON.parse(localStorage.getItem('order'));
    const id = orderDetails.addressId
    var baseAPI = this.apiurl + 'address/findone/';
    return this.http.get(baseAPI+`${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
      );
  }

  createUserAddress(model: any) {
    const id = this.user.passportId;
    const header = new HttpHeaders().set('content-type',	'application/json');
    return this.http.post(this.apiurl + 'address/create/'+`${id}` , model, {headers: header} ).pipe(
      map((response: Address) => {
        return response;
      }),
      catchError(this.handleError)
      );
  }
  
  deactivateAccount(id: any) {
    // let user = JSON.parse(localStorage.getItem('user'));
    // const header = new HttpHeaders().set('Authorization',`Bearer ${user.token}`); 
      this.http.put(`https://localhost:5001/api/account/deactivate/${id}` , {}).subscribe(res=>{
        return res;
      })
  } 

  updateAccount(id, model) {
    this.http.put(`https://localhost:5001/api/account/update/${id}` , model).subscribe(res=>{
      this.model = res;
      return res;
    })
    // const header = new HttpHeaders().set('Authorization','Bearer ' + this.user.token); 
    // let api = `https://localhost:5001/api/account/update`;
    // return this.http.put(`https://localhost:5001/api/account/update`, model).pipe(
    //   map((res: Response) => {
    //     return this.profile = res;
    //   }),
    //   catchError(this.handleError)
    // )
    return this.model;
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
      return this.http.post(this.apiurl + 'account/register' , model ).pipe(
        map((response: User) => {
          return response;
        })
        );
    }

  // tslint:disable-next-line:typedef
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('order');
    this.currentUserSource.next(null);
  }
}
