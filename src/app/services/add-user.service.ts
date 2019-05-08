import { Injectable } from '@angular/core';
import { AddUser } from '../model/AddUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(public http: HttpClient) { }

  userDataSource: any;
  
  getAllUsers():Observable<any>{
    var  baseURL = 'master/getAll/user'; 
    return this.http.get(baseURL);
  }

  createUser(addUserRequest : AddUser) : Observable<any>{
    var baseURL = 'master/add/user';
    return this.http.post(baseURL,addUserRequest);
  }

  updateUser(addUserRequest: AddUser) : Observable<any> {
    var  baseURL = 'master/update/user/'+ addUserRequest.id; 
    return this.http.post(baseURL,addUserRequest);
  } 

  getUserById(addUserId : any) : Observable<any>{
    var  baseURL = 'master/get/user/'+addUserId; 
    return this.http.get(baseURL);
  }

  deleteUser(addUserId) : Observable<any> {
    var  baseURL = 'master/delete/user/'+addUserId; 
    return this.http.post(baseURL,{});
  }
}
