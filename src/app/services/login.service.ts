import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Cookie } from 'ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }


  public clientId = 'fooClientId';
   public redirectUri = 'http://localhost:4200/';

  // checkCredentials(){
  //   return Cookie.check('access_token');
  // } 
 
  // logout() {
  //   Cookie.delete('access_token');
  //   window.location.reload();
  // }


  authenticate(username, password) {
    const body = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa('client:password1'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('/oauth/token', body.toString(), {headers});
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token')
    console.log(!(user === null))
    return !(user === null)
  }


}
