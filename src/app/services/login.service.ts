import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }


  public clientId = 'fooClientId';
   public redirectUri = 'http://localhost:4200/';

  checkCredentials(){
  } 
 
  logout() {
  
    window.location.reload();
  }


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
